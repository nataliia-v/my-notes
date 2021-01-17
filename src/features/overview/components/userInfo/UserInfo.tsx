import React from "react";
import { useRecoilValue } from "recoil";

import { loggedUser } from "../../../../App";

import styles from './UserInfo.module.scss';

export const UserInfo: React.FC = () => {
  const user = useRecoilValue<any>(loggedUser);
  
  return (
    <div className={styles.userInfoBlock}>
      <div className={styles.mainInfo}>
        <div className={styles.nameEmail}>
          <h3 className={styles.userName}>{user?.displayName}</h3>
          <span className={styles.userEmail}>{user?.email}</span>
        </div>
        <img className={styles.userImg} src={user?.photoURL} alt=""/>
      </div>
      
    </div>
  );
};
