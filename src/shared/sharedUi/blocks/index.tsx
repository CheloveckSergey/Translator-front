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

export const SharedBlocks = {
  MenuPoint,
}