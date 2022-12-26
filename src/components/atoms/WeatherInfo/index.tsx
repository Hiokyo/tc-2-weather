import React, { useEffect, useMemo, useState } from 'react'
import { dataWeather } from '../../../api/data';
import { Col, Row, Space, Statistic, message } from 'antd';

import { minutesToMilliseconds, secondsToMilliseconds} from 'date-fns';
import { ClockCircleTwoTone, ClockCircleOutlined } from '@ant-design/icons';
import { wetherIcon } from '../../../untils/constant';
import TimeNow from '../Time';
import styles from './styles.module.scss';

const { Countdown } = Statistic;

const weekDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const WeatherInfo = () => {
  const [ dayOfWeek, setDayOfWeek ] = useState('');
  const [ dataToday, setDataToday ] = useState<any>();
  const [ nowWeather, setNowWeather ] = useState();
  const [ timeStartOfWeather, setTimeStartOfWeather ] = useState<any>();
  const [ nextWeather, setNextWeather ] = useState();
  const [ durationOfWeather, setDurationOfWeather ] = useState();
  const [ timeLeft , setTimeLeft ] = useState<any>();
  const [ durationOfNextWeather, setDurationOfNextWeather ] = useState();
  const [ time, setTime ] = useState<any>();
  const date = new Date()
  const today = date.getDay()
  const timeData = dataToday?.map((element: any ) => {
    const h = (element.time)?.split(':')[0]
    const m = (element.time)?.split(':')[1]
    return {
        time: (h * 3600) + (m * 60),
        type: element.type,
        mins: element.mins,
      }
  })
  useEffect(()=> {
    const update = () => {
      const date = new Date()
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      const totalSeconds = ((hours * 3600) + (minutes * 60) + seconds);
      let indexItem = 0;
      let itemNow: any;
      let timeLeft = 0;

      if (timeData && totalSeconds) {
        indexItem = timeData.findIndex((element: any) => +element.time > +totalSeconds)
        itemNow = dataToday[indexItem -1];
        timeLeft = (minutesToMilliseconds(itemNow?.mins)) - (secondsToMilliseconds(totalSeconds) - (secondsToMilliseconds(timeData[indexItem - 1]?.time)))
        setTimeLeft(timeLeft);
        setTimeStartOfWeather(dataToday[indexItem -1]?.time);
        setTime(date.toLocaleTimeString('en-US', {hour12: true}))
        setNowWeather(itemNow?.type);
        setNextWeather(dataToday[indexItem]?.type);
        setDurationOfWeather(itemNow?.mins);
        setDurationOfNextWeather(dataToday[indexItem]?.mins)
      }
    }
    update();
    const interval = setInterval(()=> {
      update();
    }, 1000);
    return ()=>clearInterval(interval);
  }, [dataToday]);
  
  useEffect(() => {
    const weekDay = weekDays[today];
    setDayOfWeek(weekDay);
    setDataToday(dataWeather[weekDay]);
  }, [today])

  const handleShowMessage = () => {
    message.warning('The weather has changed!')
  }


  const values = useMemo(() => Date.now() + timeLeft, [nowWeather])
  return (
    <Row className={styles.container} gutter={16}>
      
      <Col span={4}>
        <TimeNow time={time}/>
      </Col>
      <Col span={6} offset={2}>
        <Space
          direction='vertical'
          size='middle'
        >
          <Statistic className={styles.weather} title="Now weather" value={nowWeather} suffix={<img className={styles.icon} src={ nowWeather && wetherIcon[nowWeather]}></img>}/>
          <Statistic 
            title="Duration" 
            value={durationOfWeather} 
            prefix={<ClockCircleOutlined />}
            suffix={'Minutes'}
          />
        </Space>
      </Col>
      <Col span={6} >
        <Space
          direction='vertical'
          size='middle'
        >
          <Statistic className={styles.weather} title="Next weather" value={nextWeather} suffix={<img className={styles.icon} src={nextWeather && wetherIcon[nextWeather]}></img>}/>
          <Statistic 
            title="Duration" 
            value={durationOfNextWeather} 
            prefix={<ClockCircleOutlined />}
            suffix={'Minutes'}
          />
        </Space>
      </Col>
      <Col span={4}>
        <Countdown title="Countdown" value={values} prefix={<ClockCircleTwoTone/>} onFinish={handleShowMessage}/>
      </Col>
    </Row>
  )
}

export default WeatherInfo