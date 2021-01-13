import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { mutate } from 'swr';
import { Button, Modal, Tabs } from 'antd';

import { loggedUser } from "../../../../App";
import { NoteItem } from "../notesList";
import * as db from '../../../../firebase'
import { CREATE_NOTE, DEFAULT_NOTE } from "../constants";

import styles from './CreateNote.module.scss';

export interface CreateNoteProps {
  isModalVisible: boolean,
  handleCancel: () => void
}

export const CreateNote: React.FC<CreateNoteProps> = ({isModalVisible, handleCancel}) => {
  const { TabPane } = Tabs;
  
  const user = useRecoilValue<any>(loggedUser);
  
  const [note, setNote] = useState<NoteItem>(DEFAULT_NOTE);
  const [submitting, setSubmitting] = useState<boolean>(false);
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>| any ) => {
    const { name, value, files } = event.target;
    
    if(files) {
      const image = files[0];
      setNote(prevState => ({...prevState, images: image}))
    } else {
      setNote(prevState => ({...prevState, [name]: value}))
    }
  }
  
  const handleCreateNote = async () => {
    try {
      setSubmitting(true);
      await db.createNote(note, user);
      await mutate(user.uid);
      setNote(DEFAULT_NOTE)
    } catch (error){
      console.error(error)
    } finally {
      setSubmitting(false);
    }
  }
  
  
  function callback(key: any) {
    console.log(key);
  }
  
  return (
    <Modal title={CREATE_NOTE} visible={isModalVisible} onCancel={handleCancel} onOk={handleCreateNote} footer={[
      <Button key="submit" type="primary" loading={submitting} onClick={handleCreateNote}>
        {submitting ? "Creating..." : "Create Note"}
      </Button>,
    ]}>
      <input
        type="text"
        name="name"
        placeholder="Add name"
        required
        value={note.name}
        onChange={(event)=> handleChange(event)}/>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Text aria" key="textAria">
                <textarea
                  name="description"
                  placeholder="Add description"
                  value={note.description}
                  onChange={(event)=> handleChange(event)}/>
        </TabPane>
        <TabPane tab="List" key="list">
          <input
            type="text"
            name="name1"
            placeholder="Add item name"
            required
            value={note.name}
            onChange={(event)=> handleChange(event)}/>
        </TabPane>
      </Tabs>
      <input
        placeholder="Add list name"
        type="file"
        accept="image/*"
        name="images"
        onChange={(event)=> handleChange(event)}
      />
      {
        note.images && (
          <img className={styles.img} src={URL.createObjectURL(note.images)} alt=""/>
        )
      }
    </Modal>
  );
};
