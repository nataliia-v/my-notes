import React from "react";
import { useRecoilValue } from "recoil";
import useSWR from "swr";
import {Col, Layout, Row, Spin, Empty, Card, Divider} from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined
} from "@ant-design/icons";

import { NoteItem } from "./NotesList";
import { NoteCard } from "../noteCard";

import * as db from "../../../../firebase";
import { loggedUser } from "../../../../App";

import styles from './UserNotes.module.scss';


export interface UserNotesProps {
  notes: NoteItem[]
}

export const UserNotes: React.FC<UserNotesProps> = ({notes}) => {
  const { Meta } = Card;
  
  const user = useRecoilValue<any>(loggedUser);
  
  // const { data: notes, error } = useSWR(user?.uid, db.getUserNotes)
  //
  // if (error) return <div>Error: {error.message}</div>
  // if (!notes) return <Spin/>
  // if (notes.length === 0) return <Empty/>

  return (
    <Layout className={styles.notesList}>
      
      <div className={styles.listWrap}>
        <span className={styles.rotated}>IN PROGRESS</span>
        <Row justify="start">
          {
            notes.filter((note: NoteItem) => !note.is_done).map((item: NoteItem) => <NoteCard key={item.id} note={item}/>)
          }
        </Row>
      </div>
      
      <Divider/>
      
      <div className={styles.listWrap}>
        <span className={styles.rotated}>DONE</span>
        <Row justify="start">
          {
            notes.filter((note: NoteItem) => note.is_done).map((item: NoteItem) => <NoteCard key={item.id} note={item}/>)
          }
        </Row>
      </div>
      
    </Layout>
  );
}
