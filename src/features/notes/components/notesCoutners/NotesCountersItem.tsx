import React from 'react';

import { NotesCountersItemProps} from "../../models";

import styles from "./NotesCounters.module.scss";


export const NotesCountersItem: React.FC<NotesCountersItemProps> = ({ noteCounter }) => {
  return (
    <div className={styles.countBlock}>
      <div className={styles.countName}>
        <div className={styles.iconWrap}>{noteCounter.icon}</div>
        <p className={styles.name}>{noteCounter.name}</p>
      </div>
      <span className={styles.totalCount}>{noteCounter.count}</span>
    </div>
  );
};

