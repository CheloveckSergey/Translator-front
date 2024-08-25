import { ChangeEvent, FC } from "react";
import './styles.scss';
import { SharedUiHelpers } from "../helpers";

interface CIProps {
  type: 'text' | 'textarea' | 'password',
  value: string,
  setValue: (value: string) => void,
  className?: string,
}
const CustomInput: FC<CIProps> = ({ type, value, setValue, className }) => {

  if (type === 'text') {
    return (
      <input 
        type='text' 
        className={['custom-text-input', className].join(' ')}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      />
    )
  }

  if (type === 'password') {
    return (
      <input 
        type='password' 
        className={['custom-password-input', className].join(' ')}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      />
    )
  }

  return (
    <textarea 
      className={['custom-textarea', className].join(' ')}
      value={value}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)}
    />
  )
}

interface CSProps {
  body: React.ReactNode | React.ReactNode[] | string,
  isLoading: boolean,
  isError: boolean,
  // onClick: () => void,
  color: 'green' | 'light' | 'dark',
  className?: string,
}
const CustomSubmit: FC<CSProps> = ({ body, isLoading, isError, color, className }) => {

  return (
    <button
      className={["custom-submit", color, className].join(' ')}
    >
      <SharedUiHelpers.ErrorLoader
        isLoading={isLoading}
        isError={isError}
      >
        {body}
      </SharedUiHelpers.ErrorLoader>
    </button>
  )
}

export const SharedInputs = {
  CustomInput,
  CustomSubmit,
}