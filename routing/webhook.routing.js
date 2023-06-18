const express = require('express')
const { replyMessage } = require('../services/webook.services')

const router = express.Router()

router.post('/webhook', replyMessage)


module.exports = router
