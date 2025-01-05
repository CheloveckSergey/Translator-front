import { FC } from "react";
import './styles.scss';
import { SharedIcons } from "../icons";

interface ELProps {
  children: React.ReactNode[] | React.ReactNode,
  isLoading: boolean,
  isError: boolean,
  iconSize?: number,
  isEmpty?: boolean,
  emptyHolder?: React.ReactNode,
  emptyClassname?: string,
  loadingSceleton?: React.ReactNode,
  className?: string,
}
const ErrorLoader: FC<ELProps> = ({ 
  children, 
  isLoading, 
  isError, 
  iconSize = 20, 
  className, 
  isEmpty, 
  emptyHolder,
  loadingSceleton,
  emptyClassname,
}) => {

  if (isLoading) {
    if (loadingSceleton) {
      return (
        <>
          {loadingSceleton}
        </>
      )
    }

    return (
      <div className={["load-error-wrapper", className].join(' ')}>
        <SharedIcons.Spinner size={iconSize} />
      </div>
    )
  }

  if (isError) {
    return (
      <div className={["load-error-wrapper", className].join(' ')}>
        <SharedIcons.Error size={iconSize} />
      </div>
    )
  }

  if (isEmpty) {
    return (
      <div className={["empty-holder", emptyClassname].join(' ')}>
        <p>{emptyHolder}</p>
      </div>
    )
  }

  return (
    <>
      {children}
    </>
  )
}

export const SharedUiHelpers = {
  ErrorLoader,
}