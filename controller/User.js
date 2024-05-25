const router = require('express').Router()
// const sequelize = require('../util/database.js')
const Sequelize = require('sequelize')


router.post('/identify-replace',(req,res)=>{
    const panRegex = /\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/g;
    const aadharRegex = /\b\d{4}\s?\d{4}\s?\d{4}\b/g;
    const bankAccountRegex = /\b\d{9,18}\b/g;
    const bankIFSCcodeRegex = /\b[A-Z]{4}0[A-Z0-9]{6}\b/g;
    const dematRegex = /\b[A-Z0-9]{16}\b/g;
    const gmailRegex = /\b[A-Za-z0-9._%+-]+@gmail\.com\b/g;
    const mobileNumberRegex = /\b(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g;
    const {query} =req.body
    try{
        let replacedText = query.replace(panRegex, "xxxxxxxxxx")
        replacedText =replacedText.replace(aadharRegex, "xxxxxxxxxxxx")
        replacedText =replacedText.replace(dematRegex,"xxxxxxxxxxxxxxxx")
        replacedText = replacedText.replace(bankAccountRegex,"xxxxxxxxxx") // this will also replace bank account number and aadhar card
        replacedText =replacedText.replace(bankIFSCcodeRegex,"xxxxxxxxxxx")
        replacedText =replacedText.replace(gmailRegex,"xxxxxxxxxxx")
        replacedText =replacedText.replace(mobileNumberRegex,"xxxxxxxxxxx")
        res.status(200).json({success:true,query:replacedText})
    }
    catch(err){
        console.log(err)
        res.status(400).json({success:false,msg:"Error while replacing information"})
    }
})

module.exports = router