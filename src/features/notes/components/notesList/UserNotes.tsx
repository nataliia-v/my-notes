import React from "react";
import { useRecoilValue } from "recoil";
import useSWR from "swr";
import {Col, Layout, Row, Spin} from "antd";

import { NoteItem } from "./NotesList";
import * as db from "../../../../firebase";
import { loggedUser } from "../../../../App";

import styles from './UserNotes.module.scss';

export const UserNotes = () => {
  const user = useRecoilValue<any>(loggedUser);
  
  const { data: notes, error } = useSWR(user?.uid, db.getUserNotes)
  
  if (error) return <div>Error: {error.message}</div>
  if (!notes) return <Spin/>
  if (notes.length === 0) return <div>EMPTY</div>

  return (
    <Layout>
      <Row justify="space-between">
        {
          notes.map((item: NoteItem) => (
            <Col key={item.id} span={4}><p>{item.name}</p>
                <img className={styles.img} src={item.images} alt=""/>
            </Col>
        ))
      }
      </Row>
    </Layout>
  );
}
