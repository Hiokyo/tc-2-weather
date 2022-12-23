import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss';


const TimeNow = ({h24=true}) => {
  const [hour  , setHour  ] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  useEffect(()=> {

    const update = () => {
      const date = new Date();
      let hour = date.getHours();
      if(!h24) {
          hour = (hour % 12) || 12;
      }
      setHour(hour);
      setMinute(date.getMinutes());
      setSecond(date.getSeconds());
      // setDay(date.getDay());
      // setPm(date.getHours() >= 12);
    }
    update();

    const interval = setInterval(()=> {
        update();
    }, 1000);

    return ()=>clearInterval(interval);
  }, []);

  return (
    <div className={styles.clock}>
      <div className={styles.hour}>
        <p>{hour}</p>
        <p> : </p>
        <p>{minute}</p>
        <p> : </p>
        <p>{second}</p>
      </div>
    </div>
  )
}

export default TimeNow