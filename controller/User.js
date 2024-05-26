const router = require('express').Router()
const regex =require('../util/Regex')
const axios = require('axios')


router.post('/resolve-query',(req,res)=>{
    const {question,description} =  req.body
    const maskedQuery = regex.replaceSensativeInformation(question)
    const maskedDescription =regex.replaceSensativeInformation(description)
    const data = {
        question: maskedQuery,
        description: maskedDescription
      };
    axios.post(`${process.env.RetoolUrl}startTrigger`,data,{
        headers:{
            'Content-Type': 'application/json',
            'X-Workflow-Api-Key': 'retool_wk_1e75c1f250cc4f0cb29bc0de07887e19'  
        }
    }).then((response)=>{
        res.status(200).json(response.data)
    })
    .catch((err)=>{
        console.log(err);
        res.status(400).json({"msg":"Error in retool AI workflow"})
    })
})

module.exports = router