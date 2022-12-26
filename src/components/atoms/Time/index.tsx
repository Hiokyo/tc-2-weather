import React from 'react'
import styles from './styles.module.scss';

interface Props {
  time: any;
}

const TimeNow = (props: Props) => {
  return (
    <div className={styles.clock}>
      <div className={styles.hour}>
        <p>{props?.time}</p>
      </div>
    </div>
  )
}

export default TimeNow