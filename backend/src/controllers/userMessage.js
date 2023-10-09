import services from '../services/index.js'


async function start (data) {
  return services.userMessages.start(data.message)
}

async function help (data) {
  return services.userMessages.help(data.message)
}


export default {
  start,
  help,
}
