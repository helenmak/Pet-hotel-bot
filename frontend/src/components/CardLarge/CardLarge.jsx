import React from 'react';
import classnames from 'classnames';

import Rating     from "../Rating/Rating";

import styles       from './CardLarge.module.css';
import commonStyles from '../common.module.css'


const CardLarge = ({product, className, onAdd}) => {
  const handleProductClick = () => {
    onAdd(product)
  }

  return (
    <div className={classnames(styles.card, className)} onClick={handleProductClick}>
      <div className={classnames(styles.image, commonStyles.backgroundImage)} style={{ backgroundImage: `url(${product.photo})`}}>
        <div className={classnames(styles.info, commonStyles.text)}>
          <div className={styles.infoRow}>
            <div className={styles.name}>{product.title}</div>
            <Rating rating={product.rating}/>
          </div>
          
          <div>{product.price.day}$/day <span className={styles.priceHour}>{product.price.hour}$/hour</span></div>
          
          <div className={styles.categories}>
            {product.categories.map(category =>
              <div className={styles.category}>{category}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardLarge;
