import React from 'react';
import classnames from 'classnames'

import styles from './CardSmall.module.css';


const CardSmall = (props) => {
  const { data } = props
  
  return (
    <div className={classnames(styles.card, props.className)}>
      {data?.photo && <img src={data?.photo} alt={`${data.title}'s avatar`} className={styles.avatar}/>}
      <div className={styles.info}>
        <div className={styles.name}>{data?.title}</div>
        <div className={styles.text}>{props.text}</div>
      </div>
    </div>
  );
};

export default CardSmall
