import React from "react";
import { useRecoilValue } from "recoil";
import useSWR from "swr";
import {Col, Layout, Row, Spin, Empty, Card, Avatar} from "antd";


import { NoteItem } from "./NotesList";
import * as db from "../../../../firebase";
import { loggedUser } from "../../../../App";

import styles from './UserNotes.module.scss';
import {EditOutlined, EllipsisOutlined, SettingOutlined} from "@ant-design/icons";

export const UserNotes = () => {
  const { Meta } = Card;
  
  const user = useRecoilValue<any>(loggedUser);
  
  const { data: notes, error } = useSWR(user?.uid, db.getUserNotes)
  
  if (error) return <div>Error: {error.message}</div>
  if (!notes) return <Spin/>
  if (notes.length === 0) return <Empty/>

  return (
    <Layout>
      <Row justify="space-between">
        {
          notes.map((item: NoteItem) => (
            // <Col key={item.id} span={4}><p>{item.name}</p>
            //     <img className={styles.img} src={item.images} alt=""/>
            // </Col>
            <Card
              style={{ width: 200, margin: 10}}
              key={item.id}
              bodyStyle={{padding: 10}}
              cover={
                <div className={styles.imgWrap}>
                  <img
                    alt="example"
                    src={item.images ? item.images : "https://argamak-sher.uz/wp-content/uploads/no-image.png"}
                    className={styles.img}
                  />
                </div>
              }
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                title={item.name}
                description={item.description}
                className={styles.description}
              />
            </Card>
            
        ))
      }
      </Row>
    </Layout>
  );
}
