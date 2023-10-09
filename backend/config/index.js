const env = process.env.NODE_ENV || 'production'

const config = await new Promise((res) => import(`./${env}.js`)
    .then((config) => res(config.default)))

export default {...config}
