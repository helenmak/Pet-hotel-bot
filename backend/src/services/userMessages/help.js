import petHotelBotTelegram from '../../bots/petHotelBotTelegram.js'
import AppError    from '../../models/AppError.js'


export default async function handleHelpMessage(msg) {
  try {
    const chatId = msg.chat.id
  
    await petHotelBotTelegram.execute('sendMessage', {
      chat_id: chatId,
      text: 'Type "/start" to start the bot or open the app by clicking the Menu button.',
      silent: true
    })
  } catch (e) {
    throw new AppError ({
      code: 'SEND_TG_MESSAGE_FAILED',
      message: 'Failed to send a message to user.',
      originalError: e
    })
  }
}
