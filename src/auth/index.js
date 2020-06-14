const authenticate = require('./authenticate')
const cookie = require('./cookie')
const isLoggedIn = require('./login-middleware')

module.exports = {
  authenticate,
  cookie,
  isLoggedIn,
}
