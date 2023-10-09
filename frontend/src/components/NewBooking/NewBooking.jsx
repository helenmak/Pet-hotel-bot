import React, {useCallback, useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom'

import PlusIcon from '../../assets/plus-icon.svg'
import MinusIcon from '../../assets/minus-icon.svg'

import api from '../../api/booking'

import Button   from '../Button/Button'
import CardSmall from '../CardSmall/CardSmall'

import {useTelegram}  from "../../hooks/useTelegram";
import errorToMessage from '../../utils/errorToMessage'
import debounce from '../../utils/debounce'

import styles         from './NewBooking.module.css';
import commonStyles   from '../common.module.css'


const getTime = (days, hours) => {
  const daysWordForm = days === 1 ? 'day' : 'days'
  const hoursWordForm = hours === 1 ? 'hour' : 'hours'
  const timeDays = days ? `${days} ${daysWordForm}` : ''
  const timeHours = hours ? `${hours} ${hoursWordForm}` : ''
  
  let connector = timeDays && !timeHours ? '' : ' '
  connector = timeHours && !timeDays ? '' : connector
  connector = timeDays && timeHours ? ' and ': connector
  
  return `${timeDays}${connector}${timeHours}`
}

const NewBooking = () => {
  const [days, setDays] = useState(1);
  const [hours, setHours] = useState(null);
  const [daysInputValue, setDaysInputValue] = useState(null);
  const [hoursInputValue, setHoursInputValue] = useState(null);
  const [comment, setComment] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null)
  
  const {tg, user, queryId} = useTelegram();
  
  const location = useLocation();
  
  const data = location.state?.data;
  
  
  const confirmRequest = async (confirmed) => {
    if (!confirmed) return

    const requestData = {
      time: getTime(days, hours),
      price: totalPrice,
      comment,
      user,
      sitter: data,
      queryId,
      chatId: user.id
    }
    try {
      await api.createBooking(requestData)
    } catch (e) {
      const errorMessage = errorToMessage[e.message]
      tg.showAlert(errorMessage)
      
      return
    }
    
    tg.close()
  }
  
  const showConfirmation = useCallback(() => {
    tg.showConfirm(`Request a ${getTime(days, hours)} pet boarding for ${totalPrice}$?`, confirmRequest)
  }, [days, hours, totalPrice])
  
  useEffect(() => {
    tg.MainButton.onClick(showConfirmation)
    return () => {
      tg.MainButton.offClick(showConfirmation)
    }
  }, [showConfirmation])
  
  useEffect(() => {
    setDaysInputValue(days)
    setHoursInputValue(hours)
  }, [])
  
  useEffect(() => {
    if(!days && !hours) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [days, hours])
  
  
  useEffect(() => {
    let nextDays = days
    let nextHours = hours
    
    if (hours >= 24) {
      nextDays = Number(days) + parseInt(nextHours / 24)
      nextHours = nextHours % 24 || null
  
      // a small timeout for a better UX
      setTimeout(() => {
        setDaysInputValue(nextDays)
        setHoursInputValue(nextHours)
        setDays(nextDays)
        setHours(nextHours)
      }, 200)
    }
  
    const months = nextDays ? parseInt(nextDays / 30) : 0;
    const weeks = nextDays ? parseInt((nextDays - months * 30) / 7) : 0;
    const daysLeft = nextDays - months * 30 - weeks * 7
  
    const total = data.price.month * months + data.price.week * weeks + data.price.day * daysLeft + data.price.hour * nextHours
    
    setTotalPrice(total)
  
    tg.MainButton.setParams({
      text: `Book for ${total}$`
    })
  }, [days, hours])
  
  
  const handleChangeHoursInput = (e) => {
    const nextHours = e.target.value ? Number(e.target.value) : null
  
    if (isNaN(nextHours)) return
    
    setHours(nextHours)
    setHoursInputValue(nextHours)
  }
  
  const handleChangeHours = useCallback(debounce(handleChangeHoursInput, 250), [])
  
  const onChangeDays = (e) => {
    if (Number(e?.target?.value) > 999) return
    
    if (e === '-1') {
      const nextDays = Number(days) - 1
      setDays(nextDays)
      setDaysInputValue(nextDays)
      return
    }
    
    if (e === '+1') {
      const nextDays = Number(days) + 1
      setDays(nextDays)
      setDaysInputValue(nextDays)
      return
    }
  
    const nextValue = e.target.value ? Number(e.target.value) : null
    if (isNaN(nextValue)) return
  
    setDays(nextValue)
    setDaysInputValue(nextValue)
  }
  
  const onChangeHours = (e) => {
    if (e?.target?.value.length > 3) return
    
    if (e === '-1' && !hours) {
      const nextHours = 23
      setHours(nextHours)
      setHoursInputValue(nextHours)
      setDays(days - 1)
      setDaysInputValue(days - 1)
      return
    } else if (e === '-1' && hours) {
      const nextHours = Number(hours) - 1
      setHours(nextHours)
      setHoursInputValue(nextHours)
      return
    }
    
    if (e === '+1') {
      const nextHours = Number(hours) + 1
      setHours(nextHours)
      setHoursInputValue(nextHours)
      return
    }
  
    setHoursInputValue(e.target.value)
  
    handleChangeHours(e)
  }
  
  const onChangeComment = (e) => {
    setComment(e.target.value)
  }
  
  return (
    <div className={styles.requestSitting}>
      <h1 className={commonStyles.title}>Request boarding</h1>
      
      <div className={styles.upperNote}>Your pet next hotel</div>
      
      <CardSmall
        data={data}
        className={styles.card}
        text={<span>{data?.price.day}$/day <span className={styles.priceHour}>{data?.price.hour}$/hour</span></span>} />
      
      <div className={styles.fields}>
        <div className={styles.fieldWrapper}>
          <label htmlFor={styles.days}>Days</label>
          <div className={styles.inputWrapper}>
            <Button
              className={styles.inputButtonDecrease}
              onClick={() => onChangeDays('-1')}
              disabled={!days}
            >
              <img src={MinusIcon} alt="-"/>
            </Button>
            <input
              className={styles.input}
              type="text"
              value={daysInputValue || ''}
              onChange={onChangeDays}
              id='days'
            />
            <Button
              className={styles.inputButtonIncrease}
              onClick={() => onChangeDays('+1')}
            >
              <img src={PlusIcon} alt="+"/>
            </Button>
          </div>
        </div>
        
        <div className={styles.fieldWrapper}>
          <label htmlFor='hours'>Hours</label>
          <div className={styles.inputWrapper}>
            <Button
              className={styles.inputButtonDecrease}
              onClick={() => onChangeHours('-1')}
              disabled={!hours && !days}
            >
              <img src={MinusIcon} alt=""/>
            </Button>
            <input
              className={styles.input}
              type="text"
              value={hoursInputValue || ''}
              onChange={onChangeHours}
              id='hours'
            />
            <Button
              className={styles.inputButtonIncrease}
              onClick={() => onChangeHours('+1')}
            >
              <img src={PlusIcon} alt=""/>
            </Button>
          </div>
        </div>
      </div>
      
      <label className={styles.textareaLabel} htmlFor='comment'>
        Additional information for pet sitter
      </label>
      <textarea
        className={styles.textarea}
        value={comment}
        onChange={onChangeComment}
        id='comment'
      />
    </div>
  );
};

export default NewBooking;
