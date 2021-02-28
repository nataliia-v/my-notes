import React from "react";
import { Button, Input } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { NoteItem } from "../notesList";

import styles from './DynamicFields.module.scss';


type DynamicFieldsProps = {
  note: NoteItem;
  setNote: (prevState: any) => void;
};

export const DynamicFields: React.FC<DynamicFieldsProps> = ({
  note,
  setNote,
}) => {
  function handleChangeDynamicFields(i: any, event: any) {
    const values = [...note.list];
    values[i].name = event.target.value;
    setNote((prevState: NoteItem) => ({ ...prevState, list: values }));
  }

  function handleRemove(i: any) {
    const values = [...note.list];
    values.splice(i, 1);
    setNote((prevState: NoteItem) => ({ ...prevState, list: values }));
  }

  return (
    <ul>
      {note.list.map((field, idx) => {
        return (
          <div key={`${field}-${idx}`} className={styles.inputWrap}>
            <Input
              type="text"
              placeholder="List item name"
              value={field.name || ""}
              onChange={(e) => handleChangeDynamicFields(idx, e)}
            />
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleRemove(idx)}
            />
          </div>
        );
      })}
    </ul>
  );
};
