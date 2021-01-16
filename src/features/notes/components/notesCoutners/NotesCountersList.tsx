import React from 'react';

import { NotesCountersItem } from "./NotesCountersItem";
import { NoteCounterType, NotesCountersListProps } from "../../models";

export const NotesCountersList: React.FC<NotesCountersListProps> = ({ notesInfoData }) => {
  return (
    <>
      {
        notesInfoData.map((noteCounter: NoteCounterType) => (
          <NotesCountersItem key={noteCounter.name} noteCounter={noteCounter} />
        ))
      }
    </>
  );
};
