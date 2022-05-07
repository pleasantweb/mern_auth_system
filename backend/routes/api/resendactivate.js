const express = require('express')
const  router = express.Router()

const resendActiveCodeController = require('../../controllers/resendActiveCodeController')

router.get('/',resendActiveCodeController.resendActiveCode)

module.exports = router