const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')

const { createExpressLogger, logger } = require('./src/lib/logger')
const initDb = require('./src/lib/init-db')
const api = require('./src/routes')

const { PORT, LOCAL_DEV } = require('./src/consts')


const reactDevCookies = (app) => {
  logger.info('allowing access for development')
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    res.header('Access-Control-Allow-Credentials', 'true')
    return next()
  })
}

const bootstrap = async (app) => {
  await initDb()

  app.use(express.static(path.join(__dirname, 'client', 'build')))

  app.use(bodyParser.json({ limit: '50mb', extended: true }))
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
  app.use(cookieParser())
  createExpressLogger(app)

  if (LOCAL_DEV) {
    reactDevCookies(app)
  }

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })

  app.use('/api/v1', api)

  app.listen(PORT, () => {
    logger.info(`Server is listening on port: ${PORT}`)
  })
}

const app = express()

bootstrap(app)
