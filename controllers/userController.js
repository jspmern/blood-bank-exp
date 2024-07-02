let bcrypt = require('bcryptjs')
const userModel = require("../models/user")
//this is for the registration
let registerController = async (req, res, next) => {
    try {
        if (!req.body.email) return res.status(404).send({ message: "All field are requied*", success: false })
        let existUser = await userModel.findOne({ email: req.body.email })
        if (existUser) return res.status(200).send({ messge: "User is Already Registered ", success: false })
        if (!req.body.password) return res.status(404).send({ message: "All field are requied*", success: false })
        //Hashing-Password
        let salt = await bcrypt.genSalt(10)
        let hashPassword = await bcrypt.hash(req.body.password, salt)
        let newUser = new userModel({ ...req.body, password: hashPassword })
        await newUser.save()
        res.status(201).send({
            message: "User Registered Succussfully",
            success: true,
            newUser
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Somthing Wrong in Registration",
            error,
            success: false
        })
    }
}
module.exports = { registerController }