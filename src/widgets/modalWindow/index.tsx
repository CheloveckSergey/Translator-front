import { FC } from "react";
import { createPortal } from "react-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import './styles.scss';
import { SharedButtons } from "../../shared/sharedUi/buttons";

interface UMWProps {
  condition: boolean,
  onClose: () => void,
  children: React.ReactNode | React.ReactNode[],
}
export const UseModalWindow: FC<UMWProps> = ({ condition, onClose, children }) => {

  return (
    <>
      {condition && createPortal(<AnotherModalWindow 
        onClose={onClose} 
      >
        {children}
      </AnotherModalWindow>, document.getElementById('App')!)}
    </>
  )
}

interface AMWProps {
  onClose: () => void,
  children: React.ReactNode | React.ReactNode[],
}
export const AnotherModalWindow: FC<AMWProps> = ({ children, onClose }) => {

  return (
    <div className="modal-window-blackout">
      {children}
      <SharedButtons.TextButton
        className="close-button"
        onClick={onClose}
        body={<AiOutlineCloseCircle size={50} />}
        color="light"
      />
    </div>
  )
}

export default AnotherModalWindow;