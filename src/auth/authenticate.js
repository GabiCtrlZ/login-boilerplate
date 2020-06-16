/* eslint-disable consistent-return */
const Joi = require('@hapi/joi')
const { User } = require('../models/index')

const schema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
})

module.exports = async (req, res, next) => {
  const {
    body,
    logger,
  } = req

  try {
    try {
      await schema.validateAsync(body)
    } catch (e) {
      const { details = [] } = e
      const { message } = details[0]

      logger.info(`unable to validate schema: ${message}`)

      return res.status(400).json({
        success: false,
        error: 'Unable to validate body schema',
        message,
      })
    }

    const { email, password } = req.body
    logger.info('got the following data', req.body)

    logger.info(`querying database for user ${email}`)

    User.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err) return res.status(500).send({ success: false, message: 'Querying for user have failed' })
      if (!user) return res.status(401).send({ success: false, message: 'Please check your email and password' })
      user.authenticate(password, (error, response) => {
        if (error || !response) return res.status(400).send({ success: false, message: 'Please check your email and password' })
        req.user = {
          userId: response._id,
          email: response.email,
        }
        logger.info('found user successfully, moving on')
        return next()
      })
    })
  } catch (e) {
    logger.info('error with authenticate route', { message: e.toString() })

    return res.status(500).json({
      success: false,
      message: e,
    })
  }
}
