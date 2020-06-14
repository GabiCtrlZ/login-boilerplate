const Joi = require('@hapi/joi')

const {
  User,
} = require('../../models')

const userSchame = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
})

module.exports = async (req, res) => {
  try {
    console.log('request to create a new user has been made', req.body)

    Joi.assert(req.body, userSchame)

    const { email, password } = req.body


    const newUser = new User({
      email,
    })

    await newUser.setPassword(password)
    await newUser.save()

    res.json({
      success: true,
    })
  } catch (e) {
    console.log('request to create a user has failed')
    res.status(400).json({
      success: false,
      error: e,
      message: 'create user failed',
    })
  }
}
