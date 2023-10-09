import petHotelBotTelegram from '../bots/petHotelBotTelegram.js'

import controllers from '../controllers/index.js'


petHotelBotTelegram.on('update', async (data) => {
  if (data.message?.text) {
    const messageToController = {
      '/start': controllers.userMessages.start,
      '/help': controllers.userMessages.help
    }
  
    messageToController[data.message.text]?.(data)
  }
});
