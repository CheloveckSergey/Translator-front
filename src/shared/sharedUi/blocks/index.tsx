import { FC } from "react"
import './styles.scss';

interface MPProps {
  body: string,
  active: boolean,
  onClick?: () => void,
  className?: string,
}
const MenuPoint: FC<MPProps> = ({ body, onClick, active, className }) => {

  return (
    <p
      className={['menu-point', className, active ? 'active' : ''].join(' ')}
      onClick={onClick}
    >
      {body}
    </p>
  )
}

interface ILProps {
  left: string,
  right: string,
  className?: string,
}
export const InfoLine: FC<ILProps> = ({ left, right, className }) => {

  return (
    <p className={["info-line", className].join(' ')}>
      <span className="left">{left}</span>
      <span className="right">{right}</span>
    </p>
  )
}

export const SharedBlocks = {
  MenuPoint,
  InfoLine,
}