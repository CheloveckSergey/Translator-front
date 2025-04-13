import { FC } from "react";
import './styles.scss';

interface BPProps {
  actions: React.ReactNode[],
}
export const ButtonsPanel: FC<BPProps> = ({ actions }) => {

  return (
    <div className="buttons-panel">
      {actions}
    </div>
  )
}