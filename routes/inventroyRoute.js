let express = require("express");
const authorizeUser = require("../middlware/authMiddlware");
const {
  createInventoryController,
  getInventoryController,
  getDonerController,
  getHospitalController,
  getOrganizationController,
} = require("../controllers/inventoryController");
let inventoryRoute = express.Router();
//create -inventory || POST
inventoryRoute.post(
  "/create-inventory",
  authorizeUser,
  createInventoryController
);
//get -inventory ||get
inventoryRoute.get("/get-inventory", authorizeUser, getInventoryController);
//get -doner||get
inventoryRoute.get("/get-doner", authorizeUser, getDonerController);
//get -hospital||get
inventoryRoute.get("/get-hospital", authorizeUser, getHospitalController);
//get -organization||get
inventoryRoute.get(
  "/get-organization",
  authorizeUser,
  getOrganizationController
);
module.exports = inventoryRoute;
