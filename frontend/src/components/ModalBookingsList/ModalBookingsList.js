import React from 'react'
import { SlidingItem, resetAnimation } from 'react-sliding-item'
import { useAutoAnimate } from "@formkit/auto-animate/react";
import classnames from 'classnames'

import Modal           from '../Modal/Modal'
import CardSmall    from '../CardSmall/CardSmall'

import {useAppContext} from '../../App.context'

import api from '../../api/booking.js'

import { hotels } from '../../assets/data/mockedData.js'

import DeleteIcon from '../../assets/bucket.svg'

import styles        from './ModalBookingList.module.css'
import commonStyles  from '../common.module.css'
import {useTelegram} from '../../hooks/useTelegram'


export default function ModalBookingsList(props) {
  const { bookings, setBookings } = useAppContext()
  
  const [animationParent] = useAutoAnimate()
  
  const { tg, user } = useTelegram()
  
  const showConfirmation = (booking) => {
    tg.showConfirm(`Cancel the boarding request to ${booking.hotel_name} ?`, () => confirmRequest(booking))
  }
  
  const confirmRequest = async ({ id }) => {
    try {
      await api.deleteBooking({id, userId: user.id})
      
      const nextBookings = bookings.filter(booking => booking.id !== id)
      
      setBookings(nextBookings)
  
      await tg.showAlert('Boarding request was cancelled')
    } catch(e) {
      await tg.showAlert('Failed to cancel boarding booking')
    }
  }
  
  
  const getHotelData = (hotelName) => {
    return hotels.find(hotel => hotel.title === hotelName)
  }
  
  
  const renderCard = (booking) => {
    const hotelData = getHotelData(booking.hotel_name)
    
    const textEl = (
      <div data-id={booking.id}>
        <div>{booking.duration} pet care for {booking.total_price}$</div>
        <div className={styles.phone}>Tel: {hotelData.phone}</div>
      </div>
    )
    
    return (
      <CardSmall
        data={{
          photo: hotelData.photo,
          title: hotelData.title,
        }}
        text={textEl}
        className={styles.card}
      />
    )
  }
  
  const renderTrailingActions = (booking) => (
    <div className={styles.deleteAction} onClick={() => showConfirmation(booking)}>
      <div className={styles.deleteIconWrapper}>
        <img
          src={DeleteIcon}
          alt="Delete"
          className={styles.deleteIcon}
        />
      </div>
    </div>
  )
  
  
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      className={styles.modal}
    >
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <div className={classnames(commonStyles.title, styles.title)}>Booked boardings</div>
          <div className={styles.closeWrapper} onClick={props.onClose}>
            <svg className={styles.closeIcon} xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 492 492"><g>
                <path
                  d="M300.188 246 484.14 62.04c5.06-5.064 7.852-11.82 7.86-19.024 0-7.208-2.792-13.972-7.86-19.028L468.02 7.872C462.952 2.796 456.196.016 448.984.016c-7.2 0-13.956 2.78-19.024 7.856L246.008 191.82 62.048 7.872C56.988 2.796 50.228.016 43.02.016c-7.2 0-13.96 2.78-19.02 7.856L7.872 23.988c-10.496 10.496-10.496 27.568 0 38.052L191.828 246 7.872 429.952C2.808 435.024.02 441.78.02 448.984c0 7.204 2.788 13.96 7.852 19.028l16.124 16.116c5.06 5.072 11.824 7.856 19.02 7.856 7.208 0 13.968-2.784 19.028-7.856l183.96-183.952 183.952 183.952c5.068 5.072 11.824 7.856 19.024 7.856h.008c7.204 0 13.96-2.784 19.028-7.856l16.12-16.116c5.06-5.064 7.852-11.824 7.852-19.028 0-7.204-2.792-13.96-7.852-19.028L300.188 246z"
                  fill={tg?.themeParams.text_color || '#fff'}
                ></path>
            </g></svg>
          </div>
        </div>
  
        {bookings && Boolean(bookings.length) && (
          <div className={styles.bookingsWrapper} ref={animationParent}>
            {bookings.map(booking => (
              <SlidingItem
                right={renderTrailingActions(booking)}
                key={booking.id}
                className={styles.bookingsWrapper}
              >
                {renderCard(booking)}
              </SlidingItem>
            ))}
          </div>
        )}
  
        {(!bookings || !bookings.length) && (
          <div className={styles.noBookings}>You haven't booked a pet boarding yet</div>
        )}
      </div>
    </Modal>
  )
}
