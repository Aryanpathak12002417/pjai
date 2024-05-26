const router = require('express').Router()
const axios = require('axios');
const imageToText = require('../util/TextExtractor');
const regex = require('../util/Regex')

router.get('/verify-error',(req,res)=>{
    const {jiraId} = req.query

    axios.get(`${process.env.JiraURL}issue/${jiraId}`,{
        headers:{
            'Accept':'application/json',
            'Authorization':process.env.JiraAuth
        }
    })
    .then((response)=>{
        return response.data.fields.attachment
    })
    .then((response)=>{
       return response.map((attachment)=>{
            return {
                id:attachment.id,
                mimeType:attachment.mimeType
            }
       }) 
    })
    .then(async (response)=>{
        const attachmentPromises= response.map(async (ele)=>{
            try{
                const byteImage = await axios.get(`${process.env.JiraURL}attachment/content/${ele.id}`,{
                    headers:{
                        'Accept':'application/json',
                        'Authorization':process.env.JiraAuth
                    },
                    responseType: 'arraybuffer'
                })
                return byteImage.data
            }
            catch(err){
                throw new Error("Problem in getting issue id")
            }
        })
        return await Promise.all(attachmentPromises);
    })
    .then(async (response)=>{
       const textData = response.map((ele)=>{
            const valo=imageToText.extractTextFromBase64Image(ele)
            return valo
        })
        return await Promise.all(textData);
    })
    .then((extractedText)=>{
        for(let i=0;i<extractedText.length;i++){
            if(regex.findError(extractedText[i])){
                res.status(200).json({success:false,msg:"Raise to product"})
                return;
            }
        }
        res.status(200).json({success:true,msg:"No Error Found in image"})
    }).catch(err=>{
        console.log(err)
        res.status(404).json({"msg":"Something went Wrong"})
    })
})

module.exports = router