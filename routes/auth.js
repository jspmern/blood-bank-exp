let express = require('express')
const { registerController } = require('../controllers/userController')
let route = express.Router()
//Register || POST
route.post('/register', registerController)
module.exports = route