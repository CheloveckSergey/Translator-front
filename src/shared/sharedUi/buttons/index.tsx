import { FC } from "react";
import { SharedIcons } from "../icons";
import './styles.scss';
import { SharedUiHelpers } from "../helpers";

type ButtonColor = 'light' | 'dark' | 'green';

interface GBProps {
  body: React.ReactNode | React.ReactNode[] | string,
  isLoading: boolean,
  isError: boolean,
  onClick: () => void,
  className: string
}
const GreenButton: FC<GBProps> = ({ body, isLoading, isError, onClick, className }) => {

  return (
    <button
      className={["green-button", className].join(' ')}
      onClick={onClick}
    >
      {isLoading ? (
        <SharedIcons.Spinner />
      ) : isError ? (
        <SharedIcons.Error />
      ) : (
        body
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

export const SharedButtons = {
  GreenButton,
  TextButton,
  TextActionButton,
}