const env = process.env.NODE_ENV || 'production'

const config = require(`./${env}.js`).default

export default config
