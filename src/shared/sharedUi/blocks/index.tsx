import { FC, useRef, useState } from "react"
import './styles.scss';
import { SharedIcons } from "../icons";
import { SharedHooks } from "../../lib";
import { SharedUiTypes } from "../types";

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

interface MCProps {
  main: React.ReactNode,
  actions: SharedUiTypes.MenuLine[],
}
const MenuContainer: FC<MCProps> = ({ main, actions }) => {

  const [shownMenu, setShownMenu] = useState<boolean>(false);

  const ref = useRef<any>(null);

  SharedHooks.useClickOutside(ref, () => setShownMenu(false));

  return (
    <div 
      className="menu-container"
      ref={ref}
    >
      <div 
        className="menu-container-main"
        onClick={() => {
          setShownMenu(!shownMenu);
        }}
      >
        {main}
      </div>
      <div 
        className={["menu", shownMenu ? 'shown' : ''].join(' ')}
      >
        {actions.map((action, index) => (
          <div
            key={index}
            className="menu-line"
            onClick={action.onClick}
          >
            <span className="name">
              {action.body}
            </span>
            <span className="icon">
              {action.isLoading && <SharedIcons.Spinner size={15} />}
              {action.isError && <SharedIcons.Error size={15} />}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

interface BLProps {
  isLoading: boolean,
  iconSize?: number,
  className?: string,
}
const BlackoutLoader: FC<BLProps> = ({ isLoading, iconSize = 25, className }) => {

  return (
    <>
      {isLoading && (
        <div className={["blackout-loader", className].join(' ')}>
          <SharedIcons.Spinner size={iconSize} />
        </div>
      )}
    </>
  )
}

export const SharedBlocks = {
  MenuPoint,
  InfoLine,
  MenuContainer,
  BlackoutLoader,
}