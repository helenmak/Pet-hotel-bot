import React, { useState, useCallback, useEffect } from 'react';
import classnames from 'classnames'
import { useNavigate } from 'react-router-dom'

import CardLarge from "../CardLarge/CardLarge";
import Rating    from '../Rating/Rating'
import Modal from '../Modal/Modal'

import { hotels } from '../../assets/data/mockedData.js'

import { useTelegram } from "../../hooks/useTelegram";

import styles from './ProductList.module.css';
import commonStyles from '../common.module.css'


const getSitterCategories = (categories) => {
  if (categories.length === 1) return categories[0]
  
  const lastCategory = categories[categories.length - 1]
  const otherCategories = categories.slice(0, categories.length - 1)
  const sitterCategories = otherCategories.join(', ')
  
  return `${sitterCategories} and ${lastCategory}`
}

const ProductList = () => {
  const [chosenItem, setChosenItem] = useState(null)
  const [isItemModalOpen, setItemModalOpen] = useState(false)
  
  const navigate = useNavigate()
  
  const {tg} = useTelegram()
  
  const handleMainButtonClick = useCallback(() => {
    navigate('/request-sitting', { state: { data: chosenItem } })
  }, [chosenItem])
  
  useEffect(() => {
    tg.expand()
  }, [])
  
  useEffect(() => {
    tg.MainButton.onClick(handleMainButtonClick)
    return () => {
      tg.MainButton.offClick(handleMainButtonClick)
    }
  }, [handleMainButtonClick])
  
  const onAdd = (product) => {
    setChosenItem(product)
    setItemModalOpen(true)
    
    // tg.showPopup({ title: product.title, message: 'popup', buttons: [{ text: 'ok', data: 'ok' }]})
    
    tg.MainButton.setParams({
      text: `Choose ${product.title}`,
    })
    tg.MainButton.show()
  }
  
  const closeItemDialog = () => {
    setChosenItem(null)
    setItemModalOpen(false)
    tg.MainButton.hide()
  }
  
  
  return (
    <div>
      <h1 className={commonStyles.title}>Choose a pet hotel</h1>
      
      <div className={styles.list}>
        {hotels.map(item => (
          <CardLarge
            product={item}
            onAdd={onAdd}
            key={item.id}
          />
        ))}
      </div>
      
      <Modal
        open={isItemModalOpen}
        onClose={closeItemDialog}
      >
        {chosenItem && (
          <div className={styles.dialogCard}>
            <div className={classnames(styles.image, commonStyles.backgroundImage)} style={{ backgroundImage: `url(${chosenItem.photo})`}} />
            
            <div className={styles.info}>
              <div className={styles.infoRow}>
                <div className={styles.name}>{chosenItem.title}</div>
                <Rating rating={chosenItem.rating}/>
              </div>
              
              <div className={styles.prices}>
                <div className={classnames(styles.priceName, styles.priceDay)}>Day</div><div>{chosenItem.price.day}$</div>
                <div className={styles.priceName}>Hour</div><div>{chosenItem.price.hour}$</div>
                <div className={styles.priceName}>Week</div><div>{chosenItem.price.week}$</div>
                <div className={styles.priceName}>Month</div><div>{chosenItem.price.month}$</div>
              </div>
              
              <div className={styles.category}>Takes care of {getSitterCategories(chosenItem.categories)}</div>
              <div className={styles.description}>{chosenItem.description}</div>
            </div>
          </div>
        )}
      </Modal>
      
      <div onClick={handleMainButtonClick}>Click</div>
    </div>
  );
};

export default ProductList;
