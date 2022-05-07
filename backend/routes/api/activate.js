const express = require('express')
const  router = express.Router()

const activateController = require('../../controllers/activateController')

router.post('/',activateController.handleActivation)

module.exports = router