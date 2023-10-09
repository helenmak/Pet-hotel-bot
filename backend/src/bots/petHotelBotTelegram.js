import TelegramBot from '../infrastructure/telegramBot.js'

import config from '../../config/index.js'


export default new TelegramBot(config.telegram_bot_token);
