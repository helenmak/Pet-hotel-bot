import petHotelBotTelegram from '../../bots/petHotelBotTelegram.js';

import AppError from '../../models/AppError.js'
import Booking  from '../../models/Booking.js'


export default async function handleSittingRequest (body) {
  const { userId, id } = body
  
  try {
    const deletedBooking = await Booking.delete(id)
    
    await petHotelBotTelegram.execute('sendMessage', { chat_id: userId, text: `Your booking with ${deletedBooking.hotel_name} was deleted` })
    
    return deletedBooking
  } catch (e) {
    throw new AppError ({
      code: 'BOOKING_REQUEST_FAILED',
      message: 'Failed to request a hotel.',
      originalError: e
    })
  }
}
