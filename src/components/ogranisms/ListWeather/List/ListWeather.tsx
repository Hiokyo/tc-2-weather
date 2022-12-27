import React, { useEffect, useMemo, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Table } from 'antd';
import { dataWeather } from '../../../../api/data';
import Filter from '../Filter';
import styles from './styles.module.scss'
import { capitalize } from '../../../../untils/helper';
import { BellTwoTone } from '@ant-design/icons';
import { weekDays } from '../../../../untils/constant';



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
  const [ dataFilterStatus, setDataFilterStatus ] = useState<any>();
  const [ dataFilterDate, setDataFilterDate ] = useState<any>();
  const [ dataFilter, setDataFilter ] = useState<any>();
  
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
      render: () => (
        <div className={styles.notifi}>
          <BellTwoTone
            style={{fontSize: 20}}
          />
        </div>
      ),
    },
  ];
  useMemo(() => {
    setDataToday(dataWeather[today]);
  }, [today])


  const handleFilter = (value: any) => {
   
  };

  // const data = useMemo(() => {
  //   if (dataFilter) return dataFilter
  //   else return dataToday
  // }, [dataFilter, dataToday])

  return (
    <>
      <Filter onChange={handleFilter}/>
      <Table
        className={styles.tableContainer}
        columns={columns}
        dataSource= {dataToday}
        pagination={false}
        rowKey={(record: any) => record?.time}
        scroll={{y: '55vh'}}
      />
    </>
  )
}

export default ListWeather