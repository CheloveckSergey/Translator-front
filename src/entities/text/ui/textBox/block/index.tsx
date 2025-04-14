import { FC } from "react";
import './styles.scss';
import { SharedButtons } from "../../../../../shared/sharedUi/buttons";

interface BWProps {
  leftActions?: React.ReactNode[],
  rightActions?: React.ReactNode[],
  undelete?: () => void,
  original: React.ReactNode | React.ReactNode[] | string,
  translation: React.ReactNode | React.ReactNode[] | string,
  changed?: boolean,
  isNew?: boolean,
  deleted?: boolean,
}
export const Block: FC<BWProps> = ({ leftActions, rightActions, undelete, original, translation, changed, isNew, deleted }) => {

  function onUndelete() {
    if (!undelete) {
      return
    }
    undelete();
  }

  let isOptions: boolean = true;
  if (!leftActions?.length && !rightActions?.length) {
    isOptions = false;
  }

  if (deleted) {
    return (
      <div className="block-deleted">
        <span>You've deleted this fucking block</span>
        {undelete && (
          <SharedButtons.TextButton
            body='Cancel'
            onClick={onUndelete}
            color="green"
          />
        )}
      </div>
    )
  }

  return (
    <div className={["text-block", changed ? 'changed' : '', isNew ? 'isNew' : ''].join(' ')}> {/* ? */}
      <div className="left">
        {isOptions && (
          <div className="buttons">
            {leftActions}
          </div>
        )}
        <div className="content">
          <p>{original}</p>
        </div>
      </div>
      <div className="right">
        {isOptions && (
          <div className="buttons">
            {rightActions}
          </div>
        )}
        <div className="content">
          <p>{translation}</p>
        </div>
      </div>
    </div>
  )
}