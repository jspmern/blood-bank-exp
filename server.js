//create Server
let express = require('express')
let app = express()
let dotenv = require('dotenv')
let cors = require('cors')
let colors = require('colors')
let morgan = require('morgan')
//configration of dotenv
dotenv.config()
//app-level middlware
app.use(express.json())
//third party middlware
app.use(cors())
app.use(morgan('dev'))
//PORT
let PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is Running At  ${PORT}`.bgMagenta.white)
})