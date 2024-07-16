let userModel = require("../models/userModel");
//this is for get donarList
let donarListController = async (req, res, next) => {
  try {
    let donars = await userModel
      .find({ role: "doner" })
      .sort({ createdAt: -1 });
    res.status(200).send({
      message: "All Donar List",
      donars,
      success: true,
      total: donars?.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Somthing wrong!", success: false, error });
  }
};
//this is for get hospital list
let HospitalListController = async (req, res, next) => {
  try {
    let hospitals = await userModel
      .find({ role: "hospital" })
      .sort({ createdAt: -1 });
    res.status(200).send({
      message: "All Hospital List",
      hospitals,
      success: true,
      total: hospitals?.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Somthing wrong!", success: false, error });
  }
};
//this is for the organization list
let organizationListController = async (req, res, next) => {
  try {
    let organization = await userModel
      .find({ role: "originazation" })
      .sort({ createdAt: -1 });
    res.status(200).send({
      message: "All Organization List",
      organization,
      success: true,
      total: organization?.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Somthing wrong!", success: false, error });
  }
};
module.exports = {
  donarListController,
  HospitalListController,
  organizationListController,
};
