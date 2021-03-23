import React, { useState } from 'react';
import { atom, useRecoilValueLoadable } from 'recoil';
import { Button, Spin } from 'antd';
import { AppstoreAddOutlined } from '@ant-design/icons';

import { UserNotes } from '../../notes/components/notesList/UserNotes';
import { CreateNote } from '../../notes/components/createNote';
import { UserInfo } from '../../overview/components/userInfo/UserInfo';
import { NotesCountersContainer } from '../../notes/components/notesCoutners';

import { CREATE_NOTE } from '../../notes/constants';
import { fetchNotes } from '../../../firebase';

import styles from './HomePage.module.scss';

export const userNotes = atom({
  key: 'userNotes',
  default: [],
});

export const HomePage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const userDetails: any = useRecoilValueLoadable(fetchNotes);
  const { state } = userDetails;

  const { contents } = userDetails;

  if (state === 'hasError') {
    return <div> There is some problem! </div>;
  }

  if (state === 'loading') {
    return <Spin tip="Loading..." />;
  }

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
            <NotesCountersContainer notes={contents} />
          </div>

          <Button type="primary" onClick={showModal}>
            <AppstoreAddOutlined />
            {CREATE_NOTE}
          </Button>
        </div>

        {state === 'hasValue' && <UserNotes notes={contents} />}
      </div>

      <CreateNote handleCancel={handleCancel} isModalVisible={isModalVisible} />
    </div>
  );
};
