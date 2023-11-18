const express = require('express')
const app = express()
const api = require('./Routes/api')
const dotenv = require('dotenv')

const fileUpload = require("express-fileupload");
const cors = require('cors')
app.use(cors())
//Temp file uploader
app.use(fileUpload({ useTempFiles: true }));
dotenv.config({
  path: '.env'
})

const cookieParser = require('cookie-parser');
app.use(cookieParser())


//Body-Parse require
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//cookies

const connectDB = require('./db/ConnectDB')
connectDB()

app.get('/', (req, res) => {
  res.send('Hello World!')
})






// API ROUTING
app.use('/api', api)


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port http://localhost:${process.env.PORT}`)
})