let express = require('express')
const authorizeUser = require('../middlware/authMiddlware')
const { createInventoryController,getInventoryController } = require('../controllers/inventoryController')
let inventoryRoute = express.Router()
//create -inventory || POST
inventoryRoute.post('/create-inventory', authorizeUser, createInventoryController)
//get -inventory ||get
inventoryRoute.get('/get-inventory', authorizeUser,  getInventoryController)
module.exports = inventoryRoute