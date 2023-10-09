import React, {useState} from 'react'

import Button from '../Button/Button'

import {useTelegram} from "../../hooks/useTelegram";
import styles from './Header.module.css';

import ModalBookingsList from '../ModalBookingsList/ModalBookingsList'


const Header = () => {
  const [isBookingModalOpen, setBookingModalOpen] = useState(false)
  
  const { user } = useTelegram()
  
  const handleBookingsClick = () => {
    setBookingModalOpen(true)
  }
  
  const closeBookingModal = () => {
    setBookingModalOpen(false)
  }
  
  
  return (
    <div className={styles.header}>
      <Button
        onClick={handleBookingsClick}
        className={styles.button}
      >
        My boardings
      </Button>
      
      <ModalBookingsList
        open={isBookingModalOpen}
        onClose={closeBookingModal}
      />
    </div>
  );
};

export default Header;
