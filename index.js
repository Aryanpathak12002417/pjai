const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser');
const app = express()
const cors = require('cors')
const auth = require('./util/auth.js')
const userController = require('./controller/User.js')
const imageController =require('./controller/Image.js')
const jiraController =require('./controller/Jira.js')

app.use(cors())
app.use(bodyParser.json({ limit: '15mb' }));
app.use(bodyParser.urlencoded({ limit: '15mb', extended: true }));
app.use('/user',auth,userController)
app.use('/image',auth,imageController)
app.use('/jira',auth,jiraController)

app.get('/',(req,res)=>{
    res.status(200).send('hi')
})

app.listen(process.env.PORT,(()=>{
    console.log(`The server is up and running at port ${process.env.PORT}`)
}))