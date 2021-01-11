import React, {useState} from "react";
import {useRecoilValue} from "recoil";

import {loggedUser} from "../../../../App";
import {NoteItem} from "../notesList";
import * as db from '../../../../firebase'

export const CreateNote: React.FC = () => {
  
  const user = useRecoilValue<any>(loggedUser);
  
  const [note, setNote] = useState<NoteItem>({
    name: "",
    description: "",
    images: null,
    created_at: null,
    label: null,
    list: null,
    updated_at: null,
    co_owner: null
  });
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>| any ) => {
    const { name, value, files } = event.target;
    
    if(files) {
      const image = files[0];
      setNote(prevState => ({...prevState, images: image}))
    } else {
      setNote(prevState => ({...prevState, [name]: value}))
    }
  }
  
  const handleCreateNote = () => {
    console.log('note', note);
    db.createNote(note, user);
  }
  
  return (
    <>
      <div>Create NOTE</div>
      <input
        type="text"
        name="name"
        placeholder="Add name"
        required
        onChange={(event)=> handleChange(event)}/>
      <textarea
        name="description"
        placeholder="Add description"
        onChange={(event)=> handleChange(event)}/>
      <input
        placeholder="Add list name"
        type="file"
        name="images"
        onChange={(event)=> handleChange(event)}
      />
      {
        note.images && (
          <img src={URL.createObjectURL(note.images)} alt=""/>
        )
      }
      <button onClick={handleCreateNote}>
        Create Note
      </button>
    </>
  );
};
