const express = require('express')
const  router = express.Router()

const verifyUserController = require('../../controllers/verifyUserController')

router.get('/',verifyUserController.verifyUser)

module.exports = router