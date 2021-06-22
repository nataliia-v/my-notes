import React, { useEffect, useState } from 'react';
import { Card, Tag } from 'antd';
import {
  EditOutlined,
  SettingOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import { NoteItem } from '../notesList';
import * as db from '../../../../firebase';

import styles from './NoteCard.module.scss';

export interface NoteCardProps {
  note: NoteItem;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const { name, description, label, id } = note;

  const { Meta } = Card;

  const onDeleteNote = async () => {
    await db.deleteNote(id);
  };

  return (
    <Card
      style={{ width: 200, margin: 10, padding: 10 }}
      bodyStyle={{ padding: 10 }}
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <DeleteOutlined onClick={onDeleteNote} key="delete" />,
      ]}
    >
      <Meta
        title={
          <div className={styles.cardTitle}>
            <h3 className={styles.title}>{name}</h3>
            {label?.color && label?.label_name && (
              <div className={styles.tagWrap}>
                <Tag color={label.color}>{label.label_name}</Tag>
              </div>
            )}
          </div>
        }
        description={description || 'fdf '}
        className={styles.description}
      />
    </Card>
  );
};
