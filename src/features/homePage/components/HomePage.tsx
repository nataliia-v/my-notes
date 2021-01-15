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
// import {fetchNotes} from "../../notes/store";
import {fetchNotes} from "../../../firebase";
import {ToolFilled} from "@ant-design/icons";

export const userNotes = atom({
  key: "userNotes",
  default: [],
});


export const HomePage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  
  const userDetails : any = useRecoilValueLoadable(fetchNotes);
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
       
       <div className={styles.statisticData}>
         <div className={styles.flexBox}>
           <div className={styles.counts}>
             <div className={styles.countBlock}>
               <div className={styles.countName}>
                 <div className={styles.iconWrap}><ToolFilled className={styles.icon} style={{ fontSize: '12px', color: 'white' }} /></div>
                 <p className={styles.name}>All Notes</p>
               </div>
               <span className={styles.totalCount}>{contents?.length}</span>
             </div>
    
             <div className={styles.countBlock}>
               <div className={styles.countName}>
                 <div className={styles.iconWrap}><ToolFilled className={styles.icon} style={{ fontSize: '12px', color: 'white' }} /></div>
                 <p className={styles.name}>Notes in Progress</p>
               </div>
               <span className={styles.totalCount}>8</span>
             </div>
             <div className={styles.countBlock}>
               <div className={styles.countName}>
                 <div className={styles.iconWrap}><ToolFilled className={styles.icon} style={{ fontSize: '12px', color: 'white' }} /></div>
                 <p className={styles.name}>Done</p>
               </div>
               <span className={styles.totalCount}>4</span>
             </div>
           </div>
  
           <Button type="primary" onClick={showModal}>
             {CREATE_NOTE}
           </Button>
           
         </div>
         

         
         {
           state === 'hasValue' && (
             <UserNotes notes={contents}/>
           )
         }
       </div>
       
       
       
       <CreateNote handleCancel={handleCancel} isModalVisible={isModalVisible}/>
    </div>
  );
}
