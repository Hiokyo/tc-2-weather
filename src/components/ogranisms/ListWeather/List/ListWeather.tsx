import React, { useMemo, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Modal, Spin, Table, message } from 'antd';
import { dataWeather } from '../../../../api/data';
import Filter from '../Filter';
import styles from './styles.module.scss'
import { capitalize, hexToDecimal } from '../../../../untils/helper';
import { BellFilled, BellTwoTone } from '@ant-design/icons';
import { weekDays } from '../../../../untils/constant';
import { closestIndexTo, hoursToMilliseconds, millisecondsToSeconds, minutesToMilliseconds } from 'date-fns';
import { sendNotification } from '../../../../api/discord';
import isEqual from 'lodash.isequal'

interface DataType {
  key: string;
  weather?: string;
  time?: number;
  duration: string;
}

interface Props {
  today?: any;
}

const ListWeather = (props: Props) => {
  const { today } = props;
  const [ dataToday, setDataToday ] = useState<any>();
  const [ dataFilter, setDataFilter ] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [visibleModalConfirm, setVisibleModalConfirm] = useState(false);
  const [recordSendNoti, setRecordSendNoti] = useState<any>({});
  const [visibleModalCancelSendNoti, setVisibleModalCancelSendNoti] = useState(false)

  const handleSendNotification = async (record: any) => {
    const date = new Date();
    const nowH = date.getHours();
    const nowM = date.getMinutes();
    const nowTime = (hoursToMilliseconds(nowH) + minutesToMilliseconds(nowM))
    let timeToSend = 0;
    const pickerH = record?.time.split(':')[0];
    const pickerM = record?.time.split(':')[1];
    const pickerTime = (hoursToMilliseconds(+pickerH) + minutesToMilliseconds(+pickerM))

    if (nowTime < pickerTime) {
      timeToSend = Number(pickerTime) - Number(nowTime);
    }
    try {
      const params = {
        username: "Dino",
        avatar_url: "https://wallpaperaccess.com/full/1916885.jpg",
        embeds: [
          {
            author: {
              name: "TC2 Weather"
            },
            title: "Time is coming!!!",
            description: `The weather is ${record.type}, it happens within ${record.mins} minutes. Hurry up guys!`,
            color: hexToDecimal("#ff0000"),
            timestamp: new Date().toISOString(),
          }
        ]
      }
      if (record) {
        setTimeout(()=> {
          sendNotification(params)
        }
        ,timeToSend);
        message.success('You have timed the notification successfully');
        setVisibleModalConfirm(false)
      }
      
    } catch (error: any) {
      message.error(error)
    }
  }

  const handleOpenModalCancelSendNoti = () => {
    setVisibleModalCancelSendNoti(true)
  }
  const handleCancelSendNoti = () => {
    setVisibleModalCancelSendNoti(false)
    setRecordSendNoti({})
  } 

  const columns: ColumnsType<DataType> = [
    {
      title: 'Weather',
      dataIndex: 'type',
      key: 'weather',
      sorter: (a: any, b: any) => a.type.localeCompare(b.type),
      render: (text) => <a className={styles.weatherText}>{capitalize(text)}</a>
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time'
    },
    {
      title: 'Duration',
      dataIndex: 'mins',
      key: 'duration',
      sorter: (a: any, b: any) => b.mins - a.mins,
    },
    {
      title: '',
      key: 'action',
      width: '5%',
      render: (_: any, record: any) => (
        <div className={styles.notifi}>
          {(isEqual(record, recordSendNoti)) ? 
            <BellFilled
              style={{fontSize: 20}}
              onClick={handleOpenModalCancelSendNoti}
            />
            :
            <BellTwoTone
              onClick={() => handleModalConfirm(record)}
              style={{fontSize: 20}}
            />
          }
        </div>
      ),
    },
  ];
  useMemo(() => {
    setDataToday(dataWeather[today]);
  }, [today])

  const handleModalConfirm = (record: any) => {
    setVisibleModalConfirm(true)
    setRecordSendNoti(record)
  }
  const handleCancelModalConfirm = () => {
    setVisibleModalConfirm(false)
  }

  const handleFilter = (value: any) => {
    setLoading(true)
    let data: any = dataToday;
    if (value.weekDay) {
      const dayOfWeek = weekDays[value.weekDay]
      const filterDate = dataWeather[dayOfWeek]
      data = filterDate
    }
    if(value.status && value.status !== 'All status'){
      const filterStatus = data.filter((item: any) => item.type === (value.status).toLowerCase())
      data = filterStatus;
    }
    if(value.timeStamp === 0 || value.timeStamp ){
      const arr: any = []
      data?.map((element: any ) => {
        const h = (element.time)?.split(':')[0]
        const m = (element.time)?.split(':')[1]
        arr.push((h * 3600) + (m * 60))
      })
      const indexOfItem = closestIndexTo(value.timeStamp , arr)
      if (indexOfItem === 0 || indexOfItem) {
        const filterTime = data[indexOfItem]
        data = [filterTime]
      }
    }
    setDataFilter(data);
    setTimeout(()=> {
      setLoading(false)
    }
    ,1000);
  };

  const data = useMemo(() => {
    if (dataFilter) return dataFilter
    else return dataToday
  }, [dataFilter, dataToday])

  return (
    <>
      <Filter onChange={handleFilter}/>
      <Spin spinning={loading}>
        <Table
          className={styles.tableContainer}
          columns={columns}
          dataSource= {data}
          pagination={false}
          rowKey={(record: any) => record?.time}
          scroll={{y: '55vh'}}
        />
      </Spin>
      <Modal
        open={visibleModalConfirm}
        onOk={() => handleSendNotification(recordSendNoti)}
        onCancel={handleCancelModalConfirm}
      >
        <h4>Are you sure to send notification for {recordSendNoti?.type} at {recordSendNoti?.time}</h4>
      </Modal>
      <Modal
        open={visibleModalCancelSendNoti}
        onOk={handleCancelSendNoti}
        onCancel={() => setVisibleModalCancelSendNoti(false)}
      >
        <h4>Are you sure to cancel send notification for {recordSendNoti?.type} at {recordSendNoti?.time}</h4>
      </Modal>
    </>
  )
}

export default ListWeather