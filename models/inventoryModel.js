let mongoose = require("mongoose");
let inventorySchema = new mongoose.Schema(
  {
    inventoryType: {
      type: String,
      required: [true, "inventory type is required*"],
      enum: ["in", "out"],
    },
    donerEmail: {
      type: String,
      required: [true, "Doner Email is Required"],
    },
    bloodGroup: {
      type: String,
      required: [true, "blood group is required *"],
      enum: ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"],
    },
    quantity: {
      type: String,
      required: [true, "blood quanity is required *"],
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "Organization is required *"],
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: function () {
        return this.inventoryType === "out";
      },
    },
    donar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      // required: function () {
      //     return this.inventoryType === "in"
      // }
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("inventory", inventorySchema);
