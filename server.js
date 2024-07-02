//create Server
let express = require('express')
let app = express()
let dotenv = require('dotenv')
let cors = require('cors')
let colors = require('colors')
let morgan = require('morgan')
const databaseConnection = require('./config/db')
const route = require('./routes/auth')
//configration of dotenv
dotenv.config()
//app-level middlware
app.use(express.json())
//third party middlware
app.use(cors())
app.use(morgan('dev'))
//database connection
databaseConnection()
//route-level middlware
app.use('/auth/v1', route)
//PORT
let PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is Running At  ${PORT}`.bgMagenta.white)
})