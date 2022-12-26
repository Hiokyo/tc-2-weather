import React from 'react'
import Coundown from '../molecules/Coundown/Coundown'
import { Card, Space } from 'antd';

import styles from './styles.module.scss'
import Header from '../molecules/Header/Header';
import Foolter from '../molecules/Foolter/Foolter';
const Page = () => {
  
  return (
    <div className={styles.pageContainer}>
      <Header></Header>
        <Card className={styles.card} title="Weather of New York map" bordered={false}>
          <Coundown/>
        </Card>
      {/* <Foolter></Foolter> */}
    </div>
  )
}

export default Page