import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { Spin } from 'antd';

import { Header } from '../../../../shared/components/header';
import { fetchNotes } from '../../../../firebase';

export interface NoteItem {
  author?: string;
  co_owner: string | null;
  created_at: any | null | Date;
  description: string;
  id?: string;
  images: string;
  label: {
    color: string;
    label_name: string;
  };
  list: { name: string; id?: string }[];
  name: string;
  updated_at: any | null;
  is_done: boolean;
}

const NotesDetails = () => {
  const userDetails: any = useRecoilValueLoadable(fetchNotes);
  const { state } = userDetails;

  const { contents } = userDetails;

  if (state === 'hasError') {
    return <div> There is some problem! </div>;
  }

  if (state === 'loading') {
    return <Spin tip="Loading..." />;
  }

  if (state === 'hasValue') {
    return contents.map((item: NoteItem) => (
      <div key={item.id}>
        <p>{item.name}</p>
      </div>
    ));
  }
};

export const NotesList: React.FC = () => {
  const onSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      <Header name={'Notes List'} />
      <div>NOTES LIST</div>

      <form action="" onSubmit={onSubmit}>
        <input type="file" accept="image/*" capture="camera" id="cameraInput" />
        <button>Submit</button>
      </form>

      <div>
        <NotesDetails />
      </div>
    </>
  );
};
