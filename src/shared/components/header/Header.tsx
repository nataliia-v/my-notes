import React from 'react';

import {HeaderProps} from "./models";

import styles from './Header.module.scss';


export const Header: React.FC<HeaderProps> = ({
  name,
                                              }) => {
  
  return (
    <header className={styles.header}>
      <h2 className={styles.headerName}>{name}</h2>
    </header>
  )
}
