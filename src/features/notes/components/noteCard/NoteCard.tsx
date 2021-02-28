import React from "react";
import { Card, Tag } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { NoteItem } from "../notesList";

import styles from "./NoteCard.module.scss";

export interface NoteCardProps {
  note: NoteItem;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const { Meta } = Card;

  const { name, description, label } = note;

  return (
    <Card
      style={{ width: 200, margin: 10, padding: 10 }}
      bodyStyle={{ padding: 10 }}
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
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
        description={description || "fdf "}
        className={styles.description}
      />
    </Card>
  );
};
