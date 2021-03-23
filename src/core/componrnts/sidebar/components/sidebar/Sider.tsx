import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

import { SideMenuItem } from '../sideMenuItem';

// import { auth } from "../../../../../firebase";
import { sidebarData } from '../../constants/sidebarData';
import { overviewPathName } from '../../../../../shared/constants/routingConstants';

import styles from './Sider.module.scss';

export const Sidebar: React.FC = () => {
  const history = useHistory();
  const { Sider } = Layout;

  const [collapsed, setCollapsed] = useState<boolean>(false);

  const onCollapse = (collapsed: any) => {
    setCollapsed(collapsed);
  };
  useEffect(() => {
    history.push(overviewPathName);
  }, []);

  const listSideMenuItems = sidebarData.map((item) => (
    <SideMenuItem key={item.name} item={item} />
  ));

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      theme="light"
      style={{ backgroundColor: '#2096ee' }}
    >
      <nav className={styles.sidebarNav}>
        <ul className={styles.sidebarList} style={{ height: '120px' }}>
          {listSideMenuItems}
        </ul>
      </nav>

      <li className={styles.logout}>
        <LogoutOutlined />
      </li>
    </Sider>
  );
};
