import { ChangeEvent, FC, useState } from "react"
import { Block, EditingBlock, TextSpan, TextUi } from "../../../entities/text"
import './styles.scss'
import { SharedButtons } from "../../../shared/sharedUi/buttons";
import { EditingTextSpan } from "../../../entities/text/model/types/editingTextSpan";
import { TextFeaturesLib } from "../../../features/texts";
import { FaCaretSquareDown, FaCaretSquareUp, FaRegEdit, FaTrashAlt } from "react-icons/fa";

interface BEProps {
  text: EditingTextSpan,
  updateState: () => void,
}
const BlockEditor: FC<BEProps> = ({ text, updateState }) => {

  const [original, setOriginal] = useState<string>(() => {
    const editedBlock = text.getEditedBlock();
    if (editedBlock) {
      return editedBlock.original
    } else {
      return ''
    }
  });
  const [translation, setTranslation] = useState<string>(() => {
    const editedBlock = text.getEditedBlock();
    if (editedBlock) {
      return editedBlock.translation
    } else {
      return ''
    }
  });

  function addText() {
    text.addBlock(original, translation);
    updateState();
  }

  function changeBlock() {
    text.changeBlock(original, translation);
    updateState();
  }

  function closeEditor() {
    text.closeEdit();
    updateState();
  }

  return (
    <div className="editor">
      <div className="box">
        <div className="left">
          <textarea
            value={original}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setOriginal(e.target.value)}
            className="light"
          />
        </div>
        <div className="right">
          <textarea
            value={translation}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setTranslation(e.target.value)}
            className="light"
          />
        </div>
      </div>
      <div className="buttons-panel">
        {!text.editingBlockId ? (
          <SharedButtons.SquareButton
            body='Add'
            onClick={addText}
            color="green"
            disabled={!original.length || !translation.length}
          />
        ) : (
          <SharedButtons.SquareButton
            body='Change'
            onClick={changeBlock}
            color="green"
            disabled={!original.length || !translation.length}
          />
        )}
        <SharedButtons.SquareButton
          body='Close'
          onClick={closeEditor}
          color="grey"
        />
      </div>
    </div>
  )
}

interface BWProps {
  block: EditingBlock,
  text: EditingTextSpan,
  updateState: () => void,
}
const BlockWidget: FC<BWProps> = ({ block, text, updateState }) => {

  function edit() {
    text.editBlock(block.id);
    updateState();
  }

  function deleteBlock() {
    block.setDeleted(true);
    updateState();
  }

  function undelete() {
    block.setDeleted(false);
    updateState();
  }

  function newBlockBelow() {
    text.newBlockBelow(block.id);
    updateState();
  }

  function newBlockAbove() {
    text.newBlockAbove(block.id);
    updateState();
  }

  if (block.deleted) {
    return (
      <div className="block-deleted">
        <span>You've deleted this fucking block</span>
        <SharedButtons.TextButton
          body='Cancel'
          onClick={undelete}
          color="green"
        />
      </div>
    )
  }

  return (
    <div className={["text-block", block.changed ? 'changed' : ''].join(' ')}>
      <div className="left">
        {block.original}
      </div>
      <div className="right">
        {block.translation}
        <div className="buttons">
          {block.id}
          <SharedButtons.TextButton
            body={<FaCaretSquareUp size={15} />}
            onClick={newBlockAbove}
            color="dark"
          />
          <SharedButtons.TextButton
            body={<FaCaretSquareDown size={15} />}
            onClick={newBlockBelow}
            color="dark"
          />
          <SharedButtons.TextButton
            body={<FaRegEdit size={15} />}
            onClick={edit}
            color="dark"
          />
          <SharedButtons.TextButton
            body={<FaTrashAlt size={15} />}
            onClick={deleteBlock}
            color="dark"
          />
        </div>
      </div>
    </div>
  )
}

interface ETBProps {
  text: EditingTextSpan,
  page: number,
  pagesTotal: number,
  nextPage: () => void,
  prevPage: () => void,
  setPage: (page: number) => void, 
  refetch: () => void,
  updateState: () => void,
}
export const EditingTextBox: FC<ETBProps> = ({ text, page, nextPage, prevPage, setPage, pagesTotal, refetch, updateState }) => {

  const {
    mutateAsync,
    isLoading,
    isError,
  } = TextFeaturesLib.useSaveBlocks();

  function newBlock() {
    text.newBlock();
    updateState();
  }

  function saveBlocks() {
    mutateAsync(text.getSaveBlocksDto())
    .then(() => {
      refetch();
    });
  }

  return (
    <div className="editing-text-box">
      {text.editingAboveBlockId ? 'true' : 'false'}
      {text.blocks.map((block, index) => (
        <>
          {text.editingBlockId === block.id ? (
            <BlockEditor
              key={block.id}
              text={text}
              updateState={updateState}
            />
          ) : (
            <>
              {text.editingAboveBlockId && text.editingAboveBlockId === block.id && (
                <BlockEditor
                  text={text}
                  updateState={updateState}
                />
              )}
              <BlockWidget
                key={block.id}
                block={block}
                text={text}
                updateState={updateState}
              />
              {text.editingBelowBlockId && text.editingBelowBlockId === block.id && (
                <BlockEditor
                  text={text}
                  updateState={updateState}
                />
              )}
            </>
          )}
        </>
      ))}
      {text.editing && !text.editingBlockId && (
        <BlockEditor 
          text={text}
          updateState={updateState}
        />
      )}
      {!text.editing && (
        <div className="buttons-panel">
          {!text.editing && (
            <SharedButtons.SquareButton
              body='New block'
              onClick={newBlock}
              color="green"
            />
          )}
          <SharedButtons.SquareActionButton
            body='Save'
            onClick={saveBlocks}
            isLoading={isLoading}
            isError={isError}
            color="green"
            disabled={!text.blocks.length}
          />
        </div>
      )}
      <div className="pagination">
        <SharedButtons.TextButton
          body='<'
          onClick={prevPage}
          color="green"
          disabled={page === 0}
          className="prev"
        />
        <div className="pages">
          {new Array(pagesTotal).fill(0).map((_, index) => (
            <SharedButtons.TextButton
              key={index}
              body={index + 1}
              onClick={() => setPage(index)}
              color="green"
              className={page === index ? 'current' : ''}
            />
          ))}
        </div>
        <SharedButtons.TextButton
          body='>'
          onClick={nextPage}
          color="green"
          disabled={(page + 1) >= pagesTotal}
          className="next"
        />
      </div>
    </div>
  )
}