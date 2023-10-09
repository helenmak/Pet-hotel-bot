import { isEmpty } from 'ramda'

import AppError from '../../models/AppError.js'
import Booking  from '../../models/Booking.js'


export default async function list (userId) {
  try {
    const userBookings = await Booking.findByField('user_id', Number(userId))
    
    if (isEmpty(userBookings)) {
      return null
    }
    
    return userBookings
  } catch (e) {
    throw new AppError ({
      code: 'BOOKING_REQUEST_FAILED',
      message: 'Failed to request a hotel.',
      originalError: e
    })
  }
}
