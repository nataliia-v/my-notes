import React from "react";

import * as db from '../../../firebase';

import styles from './SignIn.module.scss';


export const SignIn: React.FC = () => {
  
  return (
    <div className={styles.signIn}>
      <div className={styles.titleBlock}>
        <h1 className={styles.applicationName}>NOTES</h1>
      </div>
      <div className={styles.buttonBlock}>
        <button className={styles.signInBtn} onClick={db.signInWithGoogle}>
          Sign In With Google
        </button>
      </div>
    </div>
  );
};
