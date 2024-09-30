import { FC } from "react";
import './styles.scss';
import { SharedIcons } from "../icons";

interface ELProps {
  children: React.ReactNode[] | React.ReactNode,
  isLoading: boolean,
  isError: boolean,
  iconSize?: number,
  className?: string,
  isEmpty?: boolean,
  emptyHolder?: React.ReactNode,
  emptyClassname?: string,
}
const ErrorLoader: FC<ELProps> = ({ 
  children, 
  isLoading, 
  isError, 
  iconSize = 20, 
  className, 
  isEmpty, 
  emptyHolder,
  emptyClassname,
}) => {

  return (
    <>
      {isLoading ? (
        <div className={["load-error-wrapper", className].join(' ')}>
          <SharedIcons.Spinner size={iconSize} />
        </div>
      ) : isError ? (
        <div className={["load-error-wrapper", className].join(' ')}>
          <SharedIcons.Error size={iconSize} />
        </div>
      ) : isEmpty ? (
        <div className={["empty-holder", emptyClassname].join(' ')}>
          <p>{emptyHolder}</p>
        </div>
      ) : (
        <>
          {children}
        </>
      )}
    </>
  )
}

export const SharedUiHelpers = {
  ErrorLoader,
}