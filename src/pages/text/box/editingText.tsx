import { ChangeEvent, FC, useState } from "react"
import { Block, EditingBlock, TextSpan, TextUi } from "../../../entities/text"
import './styles.scss'
import { SharedButtons } from "../../../shared/sharedUi/buttons";
import { EditingTextSpan } from "../../../entities/text/model/types/editingTextSpan";
import { TextFeaturesLib } from "../../../features/texts";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";

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
  updateState: () => void,
}
export const EditingTextBox: FC<ETBProps> = ({ text, updateState }) => {

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
    mutateAsync(text.getSaveBlocksDto());
  }

  return (
    <div className="editing-text-box">
      {text.blocks.map((block, index) => (
        <>
          {text.editingBlockId === block.id ? (
            <BlockEditor
              key={block.id}
              text={text}
              updateState={updateState}
            />
          ) : (
            <BlockWidget
              key={block.id}
              block={block}
              text={text}
              updateState={updateState}
            />
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
    </div>
  )
}