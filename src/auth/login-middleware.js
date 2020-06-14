/* eslint-disable consistent-return */
const jwt = require('./jwt')
const { COOKIE_NAME } = require('../consts')

module.exports = async (req, res, next) => {
  try {
    if (req.method === 'OPTIONS') {
      return next()
    }
    console.log('checking whether the user posses a cookie')

    let token
    if (req.cookies[COOKIE_NAME]) {
      token = req.cookies[COOKIE_NAME]
    } else {
      res.clearCookie(COOKIE_NAME)
      return res.status(401).send({ success: false, message: 'No cookie has been found' })
    }

    console.log('verifying the users cookie with jwt')

    const decryptedToken = jwt.verify(token)
    if (decryptedToken) {
      req.user = decryptedToken
      return next()
    }

    return res.status(401).send({ success: false, message: 'Your cookie isnt valid' })
  } catch (e) {
    console.log('error with login-middleware route', { message: e.toString() })

    return res.status(500).json({
      success: false,
      message: e,
    })
  }
}
