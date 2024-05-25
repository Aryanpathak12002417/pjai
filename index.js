const express = require('express')
require('dotenv').config()
const db = require('./util/database.js')
const bodyParser = require('body-parser');
const app = express()
const cors = require('cors')
const auth = require('./util/auth.js')
const userController = require('./controller/User.js')
const imageController =require('./controller/Image.js')

app.use(cors())
app.use(bodyParser.json({ limit: '15mb' }));
app.use(bodyParser.urlencoded({ limit: '15mb', extended: true }));
app.use('/user',userController)
app.use('/image',imageController)

app.get('/verify',auth,(req,res)=>{
    res.status(200).json({"msg":"Correct ho"})
})

app.listen(process.env.PORT,(()=>{
    console.log(`The server is up and running at port ${process.env.PORT}`)
}))