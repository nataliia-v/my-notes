import React, { useState} from "react";
import { useRecoilValueLoadable } from "recoil";
import { Spin } from 'antd';

import { Header } from "../../../../shared/components/header";
import {fetchNotes} from "../../../../firebase";
// import { fetchNotes } from "../../store";

export interface NoteItem {
  author?: string,
  co_owner: string | null;
  created_at: object | null | Date;
  description: string;
  id?: string;
  images: string;
  label: string | null;
  list: null | any;
  name: string;
  updated_at: object | null;
  is_done: boolean;
}


const NotesDetails = () => {
  
  const userDetails : any = useRecoilValueLoadable(fetchNotes);
  const { state } = userDetails;

  const { contents} = userDetails;
  
  if (state === 'hasError') {
    return <div> There is some problem! </div>
  }
  
  if(state === 'loading'){
    return (<Spin tip="Loading..."/>)
  }
  
  if(state === 'hasValue'){
    return (
      contents.map((item: NoteItem) => (
        <div key={item.id}>
          <p>
            {item.name}
          </p>
        </div>
      ))
    );
    
  }
}

export const NotesList: React.FC = () => {
  
  const [imgUrl, setImgUrl] = useState(null);
  
  const onUploadImage = async (e: any) => {
    const file = e.target.files[0]; // upload the first file only
    // const storageRef = app.storage().ref();
    // const fileRef = storageRef.child(file.name);
    // await fileRef.put(file);
    // setImgUrl(await fileRef.getDownloadURL())
  };
  
  const onSubmit = (e: any) => {
    e.preventDefault();
  };


  return (
    <>
      <Header name={"Notes List"} />
      <div>NOTES LIST</div>
      
      <form action="" onSubmit={onSubmit}>
        <input
          type="file"
          accept="image/*"
          capture="camera"
          id="cameraInput"
          onChange={(e) => onUploadImage(e)}
        />
        <button>Submit</button>
      </form>
      
      <div>
        <NotesDetails />
      </div>
    </>
  );
};
