import React from 'react';
import styles from './styles.module.scss';


const Foolter = () => {
  return (
    <div id={styles.footer}>
      <ul className={styles.copyright}>
        <li>&copy; Untitled.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
      </ul>
    </div>
  )
}

export default Foolter