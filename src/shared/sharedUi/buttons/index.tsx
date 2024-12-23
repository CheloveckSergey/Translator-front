import { FC } from "react";
import { SharedIcons } from "../icons";
import './styles.scss';
import { SharedUiHelpers } from "../helpers";

type ButtonColor = 'light' | 'dark' | 'green' | 'grey';

interface GBProps {
  body: React.ReactNode | React.ReactNode[] | string,
  isLoading: boolean,
  isError: boolean,
  onClick: () => void,
  className?: string,
  disabled?: boolean,
}
const GreenButton: FC<GBProps> = ({ body, isLoading, isError, onClick, className, disabled }) => {

  return (
    <SquareButton
      body={body}
      isLoading={isLoading}
      isError={isError}
      onClick={onClick}
      className={className}
      disabled={disabled}
      color="green"
    />
  )
}

interface SBProps {
  body: React.ReactNode | React.ReactNode[] | string,
  isLoading: boolean,
  isError: boolean,
  onClick: () => void,
  className?: string,
  disabled?: boolean,
  color: ButtonColor,
}
const SquareButton: FC<SBProps> = ({ body, isLoading, isError, onClick, className, disabled, color }) => {

  return (
    <button
      className={["square-button", color, className].join(' ')}
      onClick={onClick}
      disabled={disabled}
    >
      {body}
      {isLoading ? (
        <div className="button-loader">
          <SharedIcons.Spinner size={25} />
        </div>
      ) : isError ? (
        <SharedIcons.Error />
      ) : (
        ''
      )}
    </button>
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
          <SharedButtons.GreenButton
            body='Load more'
            onClick={() => fetchNextPage()}
            isLoading={Boolean(isFetchingNextPage)}
            isError={isError}
            disabled={isFetchingNextPage}
            className={["load-more", buttonClassName].join(' ')}
          />
        </div>
      )}
    </>
  )
}

export const SharedButtons = {
  GreenButton,
  TextButton,
  TextActionButton,
  SquareButton,
  LoadMoreButton,
}