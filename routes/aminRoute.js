let express = require("express");
let adminMiddlware = require("../middlware/adminMiddlware");
const authorizeUser = require("../middlware/authMiddlware");
const {
  donarListController,
  HospitalListController,
  organizationListController,
} = require("../controllers/adminController");
let adminRoute = express.Router();
//get-doner ||get
adminRoute.get(
  "/get-donar-list",
  authorizeUser,
  adminMiddlware,
  donarListController
);
//get-hospital ||get
adminRoute.get(
  "/get-hospital-list",
  authorizeUser,
  adminMiddlware,
  HospitalListController
);
//get-orgnazation ||get
adminRoute.get(
  "/get-organization-list",
  authorizeUser,
  adminMiddlware,
  organizationListController
);

module.exports = adminRoute;
