import React from 'react'
import Clock from '../molecules/Clock'
import Coundown from '../molecules/Coundown'
import { Card, Col, Row } from 'antd';

import styles from './styles.module.scss'
const Page = () => {
  
  return (
    <div className={styles.pageContainer}>
      <Row gutter={16}>
        <Col span={4}>
          <Card className={styles.card}  bordered={false}>
            <Clock/>
          </Card>
        </Col>
      </Row>
      <Row className={styles.center} gutter={16}>
        <Col span={4}/>
        <Col span={16}>
          <Card className={styles.card} title="Weather of New York map" bordered={false}>
            <Coundown/>
          </Card>
        </Col>
        <Col span={4}/>
      </Row>
  </div>
  )
}

export default Page