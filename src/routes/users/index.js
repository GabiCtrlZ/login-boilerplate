const express = require('express')

const router = express.Router()

const { isLoggedIn, cookie, authenticate } = require('../../auth')

const login = require('./login')
const refresh = require('./refresh')
const create = require('./create')


router.post('/login', [authenticate, cookie], login)
router.post('/create', create)
router.post('/user-data', [isLoggedIn], refresh)

module.exports = router
