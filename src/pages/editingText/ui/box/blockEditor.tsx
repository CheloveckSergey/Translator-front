import { ChangeEvent, FC, useState } from "react";
import { EditingTextSpan } from "../../../../entities/text";
import './styles.scss';
import { SharedButtons } from "../../../../shared/sharedUi/buttons";

interface BEProps {
  text: EditingTextSpan,
  updateState: () => void,
}
export const BlockEditor: FC<BEProps> = ({ text, updateState }) => {

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

  function saveBlock() {
    if (text.editingBlockId) {
      text.changeBlock(original, translation);
    } else {
      text.addBlock(original, translation);
    }
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
        <SharedButtons.SquareButton
          body='Add'
          onClick={saveBlock}
          color="green"
          disabled={!original.length || !translation.length}
        />
        <SharedButtons.SquareButton
          body='Close'
          onClick={closeEditor}
          color="grey"
        />
      </div>
    </div>
  )
}