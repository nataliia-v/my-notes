import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { mutate } from 'swr';

import { loggedUser } from "../../../../App";
import { NoteItem } from "../notesList";
import * as db from '../../../../firebase'
import { DEFAULT_NOTE } from "../constants";

import styles from './CreateNote.module.scss';


export const CreateNote: React.FC = () => {
  
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
  
  return (
    <>
      <div>Create NOTE</div>
      <input
        type="text"
        name="name"
        placeholder="Add name"
        required
        value={note.name}
        onChange={(event)=> handleChange(event)}/>
      <textarea
        name="description"
        placeholder="Add description"
        value={note.description}
        onChange={(event)=> handleChange(event)}/>
      <input
        placeholder="Add list name"
        type="file"
        name="images"
        onChange={(event)=> handleChange(event)}
      />
      {
        note.images && (
          <img className={styles.img} src={URL.createObjectURL(note.images)} alt=""/>
        )
      }
      <button onClick={handleCreateNote} disabled={submitting}>
        {submitting ? "Creating..." : "Create Note"}
      </button>
    </>
  );
};
