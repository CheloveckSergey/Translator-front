import { ChangeEvent, FC, forwardRef } from "react";
import './styles.scss';
import { SharedUiHelpers } from "../helpers";
import { SharedIcons } from "../icons";

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

type CSRef = HTMLInputElement;
interface CSProps {
  body: string,
  color: 'green' | 'light' | 'dark',
  className?: string,
  disabled?: boolean,
}
const CustomSubmit = forwardRef<CSRef, CSProps>(({ body, color, className, disabled }, CSRef) => {

  return (
    <input
      type="submit"
      className={["custom-submit", color, className].join(' ')}
      ref={CSRef}
      value={body}
      disabled={disabled}
    />
  )
})

type TSRef = HTMLInputElement;
interface TSProps {
  body: string,
  color: 'green' | 'light' | 'dark',
  className?: string,
  disabled?: boolean,
}
const TextSubmit = forwardRef<TSRef, TSProps>(({ body, color, className, disabled }, CSRef) => {

  return (
    <input
      ref={CSRef}
      type="submit"
      value={body}
      disabled={disabled}
      className={["text-submit", color, className].join(' ')}
    />
  )
})

export const SharedInputs = {
  CustomInput,
  CustomSubmit,
  TextSubmit,
}