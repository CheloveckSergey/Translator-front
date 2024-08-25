import { AiOutlineLoading } from "react-icons/ai";
import './styles.scss';
import { FC } from "react";
import { BiErrorCircle } from "react-icons/bi";

interface IconProps {
  size?: number,
}
const Spinner: FC<IconProps> = ({ size = 35 }) => {

  return (
    <AiOutlineLoading 
      size={size} 
      className="spinner" 
    />
  )
}

const Error: FC<IconProps> = ({ size }) => {
  
  return (
    <BiErrorCircle size={size} className="error"/>
  )
}

export const SharedIcons = {
  Spinner,
  Error,
}