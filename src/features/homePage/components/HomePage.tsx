import React, { useEffect, useState } from 'react';
import { Button, Spin } from 'antd';
import { AppstoreAddOutlined } from '@ant-design/icons';
import useSWR from 'swr';
import { useRecoilValue } from 'recoil';

import { UserNotes } from '../../notes/components/notesList/UserNotes';
import { CreateNote } from '../../notes/components/createNote';
import { UserInfo } from '../../overview/components/userInfo/UserInfo';
import { NotesCountersContainer } from '../../notes/components/notesCoutners';

import { CREATE_NOTE } from '../../notes/constants';

import * as db from '../../../firebase';

import { loggedUser } from '../../../App';

import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const user = useRecoilValue<any>(loggedUser);
  const [usersListTEST, setUsersList] = useState([]);

  useEffect(() => {
    user &&
      db.subscribeToNotesList(user?.uid, {
        next: (querySnapshot: any) => {
          const data = querySnapshot.docs.map((doc: any) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUsersList(data);
        },
      });
  }, [user]);

  const { data: usersList, error } = useSWR(user?.uid, db.getUserNotes);

  if (error) return <div> There is some problem! </div>;

  if (!usersList) return <Spin tip="Loading..." />;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={styles.overviewSection}>
      <UserInfo />

      <div className={styles.statisticData}>
        <div className={styles.flexBox}>
          <div className={styles.counts}>
            <NotesCountersContainer notes={usersList} />
          </div>

          <Button type="primary" onClick={showModal}>
            <AppstoreAddOutlined />
            {CREATE_NOTE}
          </Button>
        </div>

        {usersListTEST && <UserNotes notes={usersListTEST} />}
      </div>

      <CreateNote handleCancel={handleCancel} isModalVisible={isModalVisible} />
    </div>
  );
};
