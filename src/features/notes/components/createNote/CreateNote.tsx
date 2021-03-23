import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { mutate } from 'swr';
import { Button, Modal, Tabs, Input } from 'antd';
import { HexColorPicker } from 'react-colorful';

import { loggedUser } from '../../../../App';
import { NoteItem } from '../notesList';
import * as db from '../../../../firebase';
import { CREATE_NOTE, DEFAULT_NOTE } from '../../constants';
import { DynamicFields } from '../dynamicFields';

import styles from './CreateNote.module.scss';

export interface CreateNoteProps {
  isModalVisible: boolean;
  handleCancel: () => void;
}

export const CreateNote: React.FC<CreateNoteProps> = ({
  isModalVisible,
  handleCancel,
}) => {
  const { TabPane } = Tabs;

  const user = useRecoilValue<any>(loggedUser);

  const [note, setNote] = useState<NoteItem>(DEFAULT_NOTE);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | any
  ) => {
    const { name, value, files } = event.target;
    if (files) {
      const image = files[0];
      setNote((prevState) => ({ ...prevState, images: image }));
    } else if (name === 'label_name') {
      setNote((prevState) => ({
        ...prevState,
        label: { ...prevState.label, label_name: value },
      }));
    } else {
      setNote((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleColorChange = (selectedColor: string) => {
    setNote((prevState) => ({
      ...prevState,
      label: { ...prevState.label, color: selectedColor },
    }));
  };

  const handleCreateNote = async () => {
    try {
      setSubmitting(true);
      await db.createNote(note, user);
      await mutate(user.uid);
      setNote(DEFAULT_NOTE);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  function callback(key: any) {
    console.log(key);
  }

  // Dynamic Fields

  const handleAddFields = () => {
    const values = [...note.list];
    values.push({ name: '' });
    setNote((prevState) => ({ ...prevState, list: values }));
  };

  return (
    <Modal
      title={CREATE_NOTE}
      visible={isModalVisible}
      onCancel={handleCancel}
      onOk={handleCreateNote}
      footer={[
        <Button
          key="submit"
          type="primary"
          loading={submitting}
          onClick={handleCreateNote}
          disabled={
            !note.name ||
            note.name.length < 3 ||
            (note.list.length > 0 && note.list?.some((el) => !el?.name))
          }
        >
          {submitting ? 'Creating...' : 'Create Note'}
        </Button>,
      ]}
    >
      <Input
        className={styles.inp}
        type="text"
        name="name"
        placeholder="Add name"
        required
        value={note.name}
        onChange={(event) => handleChange(event)}
      />
      <Input
        type="text"
        className={styles.inp}
        name="label_name"
        placeholder="Add label name"
        value={note.label.label_name}
        onChange={(event) => handleChange(event)}
      />
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Text aria" key="textAria">
          <textarea
            name="description"
            placeholder="Add description"
            value={note.description}
            onChange={(event) => handleChange(event)}
          />
        </TabPane>
        <TabPane tab="List" key="list">
          <Button type="primary" onClick={() => handleAddFields()}>
            Add list item
          </Button>
          <DynamicFields note={note} setNote={setNote} />
        </TabPane>
      </Tabs>
      <input
        type="file"
        accept="image/*"
        name="images"
        onChange={(event) => handleChange(event)}
      />
      {note.images && (
        <img
          className={styles.img}
          src={URL.createObjectURL(note.images)}
          alt=""
        />
      )}
      {note.label.label_name && (
        <HexColorPicker
          color={note.label.color}
          onChange={(selectedColor) => handleColorChange(selectedColor)}
        />
      )}
    </Modal>
  );
};
