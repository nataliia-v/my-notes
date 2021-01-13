import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { Layout, Modal, Button } from "antd";

import { UserNotes } from "../../notes/components/notesList/UserNotes";
import { CreateNote } from "../../notes/components/createNote";

import { loggedUser } from "../../../App";
import { CREATE_NOTE } from "../../notes/components/constants";

export const HomePage: React.FC = () => {
  const user = useRecoilValue<any>(loggedUser);
  const showModal = () => {
    setIsModalVisible(true);
  };
  
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <p>Hello, {user?.displayName}</p>
      <p>UID {user?.uid}</p>
      <Button type="primary" onClick={showModal}>
        {CREATE_NOTE}
      </Button>
      <UserNotes/>
      <CreateNote handleCancel={handleCancel} isModalVisible={isModalVisible}/>
    </>
  );
}
