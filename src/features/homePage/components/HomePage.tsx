import React, { useState } from "react";
import {atom, useRecoilState, useRecoilValue, useRecoilValueLoadable} from "recoil";
import {Layout, Modal, Button, Spin, Empty} from "antd";

import { UserNotes } from "../../notes/components/notesList/UserNotes";
import { CreateNote } from "../../notes/components/createNote";
import { UserInfo } from "../../overview/components/userInfo/UserInfo";

import { loggedUser } from "../../../App";
import { CREATE_NOTE } from "../../notes/components/constants";

import styles from './HomePage.module.scss';
import useSWR from "swr";
import * as db from "../../../firebase";
import {fetchNotes} from "../../notes/store";
import {fetchNotess} from "../../../firebase";

export const userNotes = atom({
  key: "userNotes",
  default: [],
});


export const HomePage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  
  const userDetails : any = useRecoilValueLoadable(fetchNotess);
  const { state } = userDetails;
  
  const { contents} = userDetails;
  
  if (state === 'hasError') {
    return <div> There is some problem! </div>
  }
  
  if(state === 'loading'){
    return (<Spin tip="Loading..."/>)
  }
  
  
  const showModal = () => {
    setIsModalVisible(true);
  };
  
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className={styles.overviewSection}>
     <UserInfo/>
     <div>
       {/*<p>UID {user?.uid}</p>*/}
       <div className={styles.statisticData}>
         <div>
         
         </div>
       </div>
       <Button type="primary" onClick={showModal}>
         {CREATE_NOTE}
       </Button>
       {
         state === 'hasValue' && (
           <UserNotes notes={contents}/>
         )
       }
       <CreateNote handleCancel={handleCancel} isModalVisible={isModalVisible}/>
     </div>
    </div>
  );
}
