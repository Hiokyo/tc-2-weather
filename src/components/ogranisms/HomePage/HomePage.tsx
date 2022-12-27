import React from 'react'
import Coundown from '../../molecules/Coundown/Coundown'
import { Card } from 'antd';

import styles from './styles.module.scss'

const Page = () => {
  
  return (
    <div className={styles.pageContainer}>
        <Card className={styles.card} title="Weather of New York map" bordered={false}>
          <Coundown/>
        </Card>
    </div>
  )
}

export default Page