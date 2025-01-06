import { FC } from "react";
import { SharedIcons } from "../icons";
import './styles.scss';
import { SharedUiHelpers } from "../helpers";

export type ButtonColor = 'light' | 'dark' | 'green' | 'grey';

interface SBProps {
  body: React.ReactNode | React.ReactNode[] | string,
  onClick: () => void,
  color: ButtonColor,
  disabled?: boolean,
  className?: string,
}
const SquareButton: FC<SBProps> = ({ body, onClick, className, disabled, color }) => {

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={["square-button", color, className].join(' ')}
    >
      {body}
    </button>
  )
}

interface SABProps {
  body: React.ReactNode | React.ReactNode[] | string,
  isLoading: boolean,
  isError: boolean,
  onClick: () => void,
  color: ButtonColor,
  className?: string,
  disabled?: boolean,
}
const SquareActionButton: FC<SABProps> = ({ body, isLoading, isError, onClick, className, disabled, color }) => {

  return (
    <SquareButton
      body={(
        <>
          {isLoading ? (
            <div className="button-loader">
              <SharedIcons.Spinner size={25} />
            </div>
          ) : isError ? (
            <SharedIcons.Error />
          ) : (
            body
          )}
        </>
      )}
      onClick={onClick}
      disabled={disabled}
      color={color}
      className={['square-action-button', className].join(' ')}
    />
  )
}

interface TBProps {
  body: React.ReactNode | React.ReactNode[] | string,
  color: ButtonColor,
  onClick: () => void,
  className?: string,
}
const TextButton: FC<TBProps> = ({ body, color, className, onClick }) => {

  return (
    <button 
      className={["shared-text-button", color, className].join(' ')}
      onClick={onClick}
    >
      {body}
    </button>
  )
}

interface TABProps {
  body: React.ReactNode | React.ReactNode[] | string,
  color: ButtonColor,
  className: string,
  isLoading: boolean,
  isError: boolean,
  onClick: () => void,
}
const TextActionButton: FC<TABProps> = ({ body, color, className, isLoading, isError, onClick }) => {

  return (
    <TextButton 
      body={<>
        <SharedUiHelpers.ErrorLoader
          isLoading={isLoading}
          isError={isError}
        >
          {body}
        </SharedUiHelpers.ErrorLoader>
      </>}
      color={color}
      className={className}
      onClick={onClick}
    />
  )
}

interface LMBProps {
  fetchNextPage: () => void,
  hasNextPage: boolean,
  isFetchingNextPage: boolean,
  isError: boolean,
  blockClassName?: string,
  buttonClassName?: string,
}
const LoadMoreButton: FC<LMBProps> = ({ 
  fetchNextPage, 
  hasNextPage, 
  isFetchingNextPage, 
  isError,
  blockClassName,
  buttonClassName,
}) => {
  return (
    <>
      {fetchNextPage && hasNextPage && (
        <div className={["load-more-wrapper", blockClassName].join(' ')}>
          <SharedButtons.SquareActionButton
            body='Load more'
            onClick={() => fetchNextPage()}
            isLoading={Boolean(isFetchingNextPage)}
            isError={isError}
            disabled={isFetchingNextPage}
            color="green"
            className={["load-more", buttonClassName].join(' ')}
          />
        </div>
      )}
    </>
  )
}

export const SharedButtons = {
  SquareButton,
  SquareActionButton,
  TextButton,
  TextActionButton,
  LoadMoreButton,
}