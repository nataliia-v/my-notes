import React from 'react';
import { Layout, Row, Divider } from 'antd';

import { NoteItem } from './NotesList';
import { NoteCard } from '../noteCard';

import styles from './UserNotes.module.scss';

export interface UserNotesProps {
  notes: NoteItem[];
}

export const UserNotes: React.FC<UserNotesProps> = ({ notes }) => {
  return (
    <Layout className={styles.notesList}>
      <div className={styles.listWrap}>
        <span className={styles.rotated}>IN PROGRESS</span>
        <Row justify="start">
          {notes
            .filter((note: NoteItem) => !note.is_done)
            .map((item: NoteItem) => (
              <NoteCard key={item.id} note={item} />
            ))}
        </Row>
      </div>

      <Divider />

      <div className={styles.listWrap}>
        <span className={styles.rotated}>DONE</span>
        <Row justify="start">
          {notes
            .filter((note: NoteItem) => note.is_done)
            .map((item: NoteItem) => (
              <NoteCard key={item.id} note={item} />
            ))}
        </Row>
      </div>
    </Layout>
  );
};
