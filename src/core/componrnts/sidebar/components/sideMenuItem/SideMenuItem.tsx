import React from "react";
import { NavLink } from "react-router-dom";

import styles from './SideMenuItem.module.scss';


export interface SideMenuItem {
  name: string;
  path: string;
  icon: any;
  className: string;
}
export interface SideMenuItemProps {
  item: SideMenuItem;
}

export const SideMenuItem: React.FC<SideMenuItemProps> = ({item}) => {
  const { icon: Icon } = item;

  return (
    <li className={styles.sideMenuItem}>
      <NavLink
        activeClassName={styles.active}
        className={styles.navLink}
        to={item.path}
      >
        <Icon className={styles[item.className]} />
        <span>{item.name}</span>
      </NavLink>
    </li>
  );
}
