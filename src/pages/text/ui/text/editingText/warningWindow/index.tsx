import { FC, useState } from "react";
import { SharedButtons } from "../../../../../../shared/sharedUi/buttons";
import './styles.scss';
import { Warnings } from "../../../../lib";

interface WWProps {
  operation: () => void,
  close: () => void,
  warnings: Warnings[],
}
export const WarningWindow: FC<WWProps> = ({ operation, close, warnings: _warnings }) => {

  const [warnings, setWarnings] = useState<Warnings[]>(_warnings);

  function onContinue() {
    if (warnings.length === 1) {
      operation();
      close();
      return
    }
    setWarnings(warnings => {
      return warnings.filter((_, index) => index !== 0)
    })
  }

  function onFastContinue() {
    operation();
    close();
  }

  return (
    <div className="save-warning-window">
      <p>{warnings[0]}</p>
      <SharedButtons.SquareButton
        body='Continue'
        color="green"
        onClick={onContinue}
      />
      <SharedButtons.SquareButton
        body='Fast continue'
        color="green"
        onClick={onFastContinue}
      />
      <SharedButtons.SquareButton
        body='Back'
        color="grey"
        onClick={close}
      />
    </div>
  )
}