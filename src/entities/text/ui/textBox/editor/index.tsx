import { ChangeEvent, FC, useState } from "react";
import './styles.scss';
import { SharedButtons } from "../../../../../shared/sharedUi/buttons";

interface BEProps {
  saveBlock: (original: string, translation: string) => void,
  close: () => void,
  original?: string,
  translation?: string,
}
export const BlockEditor: FC<BEProps> = ({ saveBlock, close, original: _original, translation: _translation }) => {

  const [original, setOriginal] = useState<string>(() => {
    return _original || ''
  });
  const [translation, setTranslation] = useState<string>(() => {
     return _translation || ''
  });

  function onSaveBlock() {
    saveBlock(original, translation);
  }

  function onClose() {
    close();
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
          body='Save'
          onClick={onSaveBlock}
          color="green"
          disabled={!original.length || !translation.length}
        />
        <SharedButtons.SquareButton
          body='Close'
          onClick={onClose}
          color="grey"
        />
      </div>
    </div>
  )
}