import { FC } from "react";
import { EditingBlock, EditingTextSpan } from "../../../../entities/text";
import { SharedButtons } from "../../../../shared/sharedUi/buttons";
import { BlockEditor } from "./blockEditor";
import { FaCaretSquareDown, FaCaretSquareUp, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import './styles.scss';

interface BWProps {
  block: EditingBlock,
  text: EditingTextSpan,
  updateState: () => void,
}
export const BlockWidget: FC<BWProps> = ({ block, text, updateState }) => {

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
    <>
      {text.editingAboveBlockId && text.editingAboveBlockId === block.id && (
        <BlockEditor
          text={text}
          updateState={updateState}
        />
      )}
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
              color="light"
              disabled={block.isNew}
            />
            <SharedButtons.TextButton
              body={<FaCaretSquareDown size={15} />}
              onClick={newBlockBelow}
              color="light"
              disabled={true}
            />
            <SharedButtons.TextButton
              body={<FaRegEdit size={15} />}
              onClick={edit}
              color="light"
            />
            <SharedButtons.TextButton
              body={<FaTrashAlt size={15} />}
              onClick={deleteBlock}
              color="light"
            />
          </div>
        </div>
      </div>
      {text.editingBelowBlockId && text.editingBelowBlockId === block.id && (
        <BlockEditor
          text={text}
          updateState={updateState}
        />
      )}
    </>
  )
}