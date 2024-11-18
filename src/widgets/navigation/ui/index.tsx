import { FC } from "react";
import './styles.scss';
import { Link } from "react-router-dom";
import { useLinks } from "../model";

export const SideNavigation: FC = () => {

  const links = useLinks();

  return (
    <div className="side-navigation">
      {links.map((link, index) => (
        <Link key={index} to={link.to} >
          <h3>{link.name}</h3>
        </Link>
      ))} 
    </div>
  )
}