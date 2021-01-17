import React from "react";

import { NotesCountersList } from "./NotesCountersList";

import useNotesCounters from "./hooks/useNotesCounters";

import { NotesCountersProps } from "../../models";

export const NotesCountersContainer: React.FC<NotesCountersProps> = ({ notes }) => {
  const { notesInfoData } = useNotesCounters({ notes });
  
  return <NotesCountersList notesInfoData={notesInfoData} />
}
