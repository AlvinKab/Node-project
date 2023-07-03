const express = require('express')
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const expressValidatior = require("express-validator")
const dotenv = require("dotenv")
dotenv.config()

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
.then(() => console.log("DB Connected"))

mongoose.connection.on('error',err => {
    console.group(`DB connection error: ${err.message}`)
})

const postRoutes = require("./routes/post")

//const myOwnMiddleware = (req, res, next) => {next()}

app.use(morgan("dev"))
//app.use(myOwnMiddleware)
app.use(bodyParser, json())
app.use(expressValidator)
app.use("/", postRoutes)

const port = process.env.PORT || 8080
app.listen(port, () => {console.log(`A Node.js API is listening on port: ${port}`)})