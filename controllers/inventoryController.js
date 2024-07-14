const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");
//this is for the create-inventory
//*****
let createInventoryController = async (req, res, next) => {
  try {
    let { email, inventoryType } = req.body;
    if (!email || !inventoryType)
      res
        .status(404)
        .send({ message: "All field are requierd *", success: false });
    let user = await userModel.findOne({ email });
    if (!user) throw new Error("User is Not found");
    // if (user.role === 'doner' && inventoryType !== "in") throw new Error("Not a User Account")
    // if (user.role == "hospital" && inventoryType !== "out") throw new Error('Not a Hospital Account')
    if (req.body.inventoryType == "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfBlood = req.body.quantity;
      let organization = new mongoose.Types.ObjectId(req.userId);
      let totalInOfRequestBlood = await inventoryModel.aggregate([
        {
          $match: {
            organization,
            bloodGroup: requestedBloodGroup,
            inventoryType: "in",
          },
        },
        { $group: { _id: "$bloodGroup", total: { $sum: "$quantity" } } },
      ]);
      const totalIn = totalInOfRequestBlood[0].total || 0;
      let totalOutOfRequestBlood = await inventoryModel.aggregate([
        {
          $match: {
            bloodGroup: requestedBloodGroup,
            organization,
            inventoryType: "out",
          },
        },
        { $group: { _id: "$bloodGroup", total: { $sum: "$quantity" } } },
      ]);
      const totalOut = totalOutOfRequestBlood[0]?.total || 0;
      //in and out calculation
      const availableQuantityOfBlood = totalIn - totalOut;
      if (!(availableQuantityOfBlood > requestedQuantityOfBlood))
        return res.status(400).send({
          success: false,
          message: `Only ${availableQuantityOfBlood}ML of ${requestedBloodGroup} is Available`,
        });
      req.body.hospital = user?._id;
    } else {
      req.body.donar = user?._id;
    }
    //save inventory
    let inventory = new inventoryModel(req.body);
    await inventory.save();
    res
      .status(201)
      .send({ message: "Inventory created successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "somthing wrong while creating inventory",
      success: false,
      error,
    });
  }
};
//this is for the getting -inventory
let getInventoryController = async (req, res, next) => {
  try {
    if (!req.userId)
      return res.status(401).send({
        message: "Not Valid ",
        success: false,
      });
    let inventory = await inventoryModel
      .find({ organization: req.userId })
      .populate("donar")
      .populate("hospital")
      .sort({ createAt: -1 });
    res.status(200).send({
      message: "Inventory Result successfully",
      success: true,
      inventory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "somthing wrong while getting inventory",
      success: false,
    });
  }
};

//this Get Doner Records
let getDonerController = async (req, res, next) => {
  try {
    const organization = req.userId;
    const donerId = await inventoryModel.distinct("donar", { organization });
    const doners = await userModel.find({ _id: { $in: donerId } });
    res.send({
      success: true,
      message: "Doner Records fetched Successfully",
      doners,
    });
  } catch (e) {
    return res
      .status(500)
      .send({ success: false, message: "Error in Doner record", e });
  }
};
//Get Hospital Records
let getHospitalController = async (req, res, next) => {
  try {
    let organization = req.userId;
    let hospitalId = await inventoryModel.distinct("hospital", {
      organization,
    });
    let hospitals = await userModel.find({ _id: { $in: hospitalId } });
    console.log(hospitals);
    res.send({
      success: true,
      message: "Hospitals Records fetched Successfully",
      hospitals,
    });
  } catch (e) {
    return res
      .status(500)
      .send({ success: false, message: "Error in Doner record", e });
  }
};
module.exports = {
  createInventoryController,
  getInventoryController,
  getDonerController,
  getHospitalController,
};
