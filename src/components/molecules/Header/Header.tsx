import React from 'react';
import logo from '../../../assets/TC2 Weather-logos_white.png';

import { Avatar, Badge } from 'antd';
import { WindowsOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.logo}>
        <img className={styles.iconLogo} src={logo}></img>
      <div className={styles.divider}></div>
      </div>
      <div className={styles.rightGroup}>
      <Badge>
        <Avatar icon={<WindowsOutlined />} shape="square" size="large" />
      </Badge>
      </div>
    </div>
  )
}

export default Header;