const env = process.env.NODE_ENV || 'production'

alert('env is: ', env)
const config = require(`./${env}.js`).default

export default config
