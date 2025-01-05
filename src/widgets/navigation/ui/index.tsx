import { FC, useRef } from "react";
import './styles.scss';
import { Link } from "react-router-dom";
import { useLinks } from "../model";
import { SharedHooks, SharedLib } from "../../../shared/lib";

interface SNProps {
  close: () => void,
}
export const SideNavigation: FC<SNProps> = ({ close }) => {

  const links = useLinks();

  const ref = useRef<any>(null);

  // SharedHooks.useClickOutside(ref, () => close());

  return (
    <div
      ref={ref}
      className="side-navigation"
    >
      {links.map((link, index) => (
        <Link 
          key={index} 
          to={link.to} 
          onClick={() => {
            close();
          }}
        >
          <h3>{link.name}</h3>
        </Link>
      ))} 
    </div>
  )
}