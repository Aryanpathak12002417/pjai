const imageToText = require('../util/TextExtractor')
const router = require('express').Router()
const errors = require('../util/Errors.json').errors

router.post('/check-error',async (req,res)=>{

    try{
        const {imageBase64}=req.body;
        const extractedText = await imageToText.extractTextFromBase64Image(imageBase64);
        let flag = false;
        for(let i=0;i<errors.length;i++){
            if(extractedText.indexOf(errors[i])!=-1){
                flag= true;
                break;
            }
        }
        if(flag){
            res.status(200).json({sucess:true,msg:"Raise to product. The image contains error"})
        }
        else{
            res.status(200).json({sucess:false,msg:"Image doesn't contain any errors."})
        }
    }
    catch(err){
        res.status(400).json({sucess:false,msg:err})
    }
    
})

module.exports = router;