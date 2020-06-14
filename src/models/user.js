const mongo = require('mongoose')

const { Schema } = mongo
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
})

userSchema.path('email').validate((email) => {
  const emailRegex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/
  return emailRegex.test(email)
}, 'Email address must be valid.')

const validPass = (password, cb) => {
  const passwordRegex = /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)\S{8,}$/
  if (!passwordRegex.test(password)) {
    return cb({ code: 400, message: 'Password should be at least 8 characters with one number, one lowercase, and one uppercase' })
  }
  return cb(null)
}

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  usernameLowerCase: true,
  usernameQueryFields: ['email'],
  errorMessages: {
    UserExistsError: 'A user with the given email is already registered',
  },
  passwordValidator: validPass,
})


module.exports = mongo.model('users', userSchema)
