let express = require('express')
const authorizeUser = require('../middlware/authMiddlware')
const { createInventoryController, getInventoryController, getDonerController, getHospitalController, getOrgnazationControllerForDoner, getOrgnazationControllerForHospital } = require('../controllers/inventoryController')
let inventoryRoute = express.Router()
//create -inventory || POST
inventoryRoute.post('/create-inventory', authorizeUser, createInventoryController)
//get -inventory ||get
inventoryRoute.get('/get-inventory', authorizeUser, getInventoryController)
//get -doner||get
inventoryRoute.get('/get-doner', authorizeUser, getDonerController)
//get -hospital||get
inventoryRoute.get('/get-hospital', authorizeUser, getHospitalController)
//get -org-doner||get
inventoryRoute.get('/get-org-doner', authorizeUser, getOrgnazationControllerForDoner)
//get -org-hospital||get
inventoryRoute.get('/get-org-hospital', authorizeUser, getOrgnazationControllerForHospital)
module.exports = inventoryRoute