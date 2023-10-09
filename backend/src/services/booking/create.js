import petHotelBotTelegram from '../../bots/petHotelBotTelegram.js';

import AppError from '../../models/AppError.js'
import Booking  from '../../models/Booking.js'


export default async function handleSittingRequest (body) {
  const {queryId, time, price, comment, user, sitter, chatId} = body;
  
  try {
    const message = `You requested a pet boarding for ${time}. Your hotel is ${sitter.title}. Total price is ${price}$. ${comment ? `Additional info to ${sitter.title}: ${comment}` : ''}`
    
    await Booking.save({
      id: queryId,
      user_id: user.id,
      hotel_name: sitter.title,
      total_price: price,
      duration: time,
      comment: comment,
      created_at: Date.now(),
      updated_at: Date.now(),
    })
    
    await petHotelBotTelegram.execute('sendPhoto', { chat_id: chatId, photo: sitter.photo, caption: message })
    
    return
  } catch (e) {
    throw new AppError ({
      code: 'BOOKING_REQUEST_FAILED',
      message: 'Failed to request a hotel.',
      originalError: e
    })
  }
}
