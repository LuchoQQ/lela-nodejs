const express = require('express')
const { createMessage } = require('../services/webhook.services')

const router = express.Router()

router.post('/', createMessage)


module.exports = router
