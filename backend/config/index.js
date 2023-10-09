const env = process.env.NODE_ENV || 'production'

console.log('env is: ', env)
const config = await new Promise((res) => import(`./${env}.js`)
    .then((config) => res(config.default)))

export default {...config}
