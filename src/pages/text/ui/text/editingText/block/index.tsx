import { FC } from "react";
import { BlockEditor } from "../editor";
import { FaCaretSquareDown, FaCaretSquareUp, FaRegEdit, FaShippingFast, FaTrashAlt } from "react-icons/fa";
import './styles.scss';
import { EditingBlock, EditingTextSpan } from "../../../../../../entities/text";
import { SharedButtons } from "../../../../../../shared/sharedUi/buttons";
import { TextFeaturesLib } from "../../../../../../features/texts";
import './styles.scss'
import { ShowWarningIf, Warnings } from "../../../../lib";

interface BWProps {
  block: EditingBlock,
  text: EditingTextSpan,
  updateState: () => void,
  showWarningIf: ShowWarningIf,
}
export const BlockWidget: FC<BWProps> = ({ block, text, updateState, showWarningIf }) => {

  const fastDeleteMutation = TextFeaturesLib.useFastDeleteBlock(fastDelete);

  function fastDelete() {
    text.fastDelete(block.id);
    updateState();
  }

  function onFastDelete() {
    fastDeleteMutation.mutate({ blockId: block.id });
  }

  function onEdit() {
    showWarningIf(
      {
        condition: text.editing,
        text: Warnings.EDITING,
      },
      () => {
        text.editBlock(block.id);
        updateState();
      },
    );
  }

  function onNewBlockBelow() {
    showWarningIf(
      {
        condition: text.editing,
        text: Warnings.EDITING,
      },
      () => {
        text.newBlockBelow(block.id);
        updateState();
      },
    );
  }

  function onNewBlockAbove() {
    showWarningIf(
      {
        condition: text.editing,
        text: Warnings.EDITING,
      },
      () => {
        text.newBlockAbove(block.id);
        updateState();
      },
    );
  }

  function onDelete() {
    block.setDeleted(true);
    updateState();
  }

  function onUndelete() {
    block.setDeleted(false);
    updateState();
  }

  if (block.deleted) {
    return (
      <div className="block-deleted">
        <span>You've deleted this fucking block</span>
        <SharedButtons.TextButton
          body='Cancel'
          onClick={onUndelete}
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
      <div className={["text-block", block.changed ? 'changed' : '', block.isNew ? 'isNew' : ''].join(' ')}>
        <div className="left">
          <div className="buttons">
            <SharedButtons.TextButton
              body={<FaCaretSquareUp size={15} />}
              onClick={onNewBlockAbove}
              color="dark"
              disabled={block.isNew}
            />
            <SharedButtons.TextButton
              body={<FaCaretSquareDown size={15} />}
              onClick={onNewBlockBelow}
              color="dark"
              disabled={block.isNew}
            />
            <SharedButtons.TextButton
              body={<FaRegEdit size={15} />}
              onClick={onEdit}
              color="dark"
            />
            <SharedButtons.TextButton
              body={<FaTrashAlt size={15} />}
              onClick={onDelete}
              color="dark"
            />
            <SharedButtons.TextActionButton
              body={<FaShippingFast size={15} />}
              onClick={onFastDelete}
              isLoading={fastDeleteMutation.isLoading}
              isError={fastDeleteMutation.isError}
              color="dark"
              title="Fast delete block"
            />
          </div>
          <div className="content">
            <p>{block.original}</p>
          </div>
        </div>
        <div className="right">
          <div className="buttons">
            
          </div>
          <div className="content">
            <p>{block.translation}</p>
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