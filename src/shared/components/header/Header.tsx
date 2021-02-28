import React from "react";
import { Button } from "antd";

import { HeaderProps } from "./models";
import { LogoutOutlined } from "@ant-design/icons";
import * as db from "../../../firebase";

import styles from "./Header.module.scss";

export const Header: React.FC<HeaderProps> = ({ name }) => {
  return (
    <header className={styles.header}>
      <h2 className={styles.headerName}>{name}</h2>

      <Button
        onClick={() => {
          db.logOut();
        }}
        type="primary"
        shape="round"
        icon={<LogoutOutlined />}
        size={"large"}
      >
        Logout
      </Button>
    </header>
  );
};
