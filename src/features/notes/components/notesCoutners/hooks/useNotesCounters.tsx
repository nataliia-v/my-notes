import React, { useMemo } from "react";
import { AppstoreOutlined, CheckCircleFilled, SyncOutlined } from "@ant-design/icons";

import { NoteItem } from "../../notesList";

import { NoteCounterType, UseNotesCountersProps } from "../../../models";

import styles from "../NotesCounters.module.scss";

const useNotesCounters = ({ notes }: UseNotesCountersProps) => {
  const inProgressCount = useMemo(() => {
    return notes.reduce((total: number, currentValue: NoteItem) => !currentValue.is_done ? total + 1 : total, 0)
  }, [notes]);
  
  const doneCount = useMemo(() => {
    return notes.reduce((total: number, currentValue: NoteItem) => currentValue.is_done ? total + 1 : total, 0);
  }, [notes]);
  
  const notesInfoData = useMemo(() => {
    return [
      {
        name: 'All Notes',
        icon: <AppstoreOutlined className={styles.icon} style={{ fontSize: '12px', color: 'white' }}/>,
        count: notes?.length,
      },
      {
        name: 'Notes in Progress',
        icon: <SyncOutlined className={styles.icon} style={{ fontSize: '12px', color: 'white' }}/>,
        count: inProgressCount
      },
      {
        name: 'Done',
        icon: <CheckCircleFilled className={styles.icon} style={{ fontSize: '12px', color: 'white' }}/>,
        count: doneCount,
      },
    ] as NoteCounterType[];
  }, [notes, inProgressCount, doneCount])
  
  return {
    notesInfoData
  };
};

export default useNotesCounters;
