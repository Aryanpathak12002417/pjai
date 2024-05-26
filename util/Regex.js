class Regex{

    replaceSensativeInformation(query){
        const panRegex = /\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/g;
        const aadharRegex = /\b\d{4}\s?\d{4}\s?\d{4}\b/g;
        const bankAccountRegex = /\b\d{9,18}\b/g;
        const bankIFSCcodeRegex = /\b[A-Z]{4}0[A-Z0-9]{6}\b/g;
        const dematRegex = /\b[A-Z0-9]{16}\b/g;
        const gmailRegex = /\b[A-Za-z0-9._%+-]+@gmail\.com\b/g;
        const mobileNumberRegex = /\b(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g;
        try{
            let replacedText = query.replace(panRegex, "xxxxxxxxxx")
            replacedText =replacedText.replace(aadharRegex, "xxxxxxxxxxxx")
            replacedText =replacedText.replace(dematRegex,"xxxxxxxxxxxxxxxx")
            replacedText = replacedText.replace(bankAccountRegex,"xxxxxxxxxx")
            replacedText =replacedText.replace(bankIFSCcodeRegex,"xxxxxxxxxxx")
            replacedText =replacedText.replace(gmailRegex,"xxxxxxxxxxx")
            replacedText =replacedText.replace(mobileNumberRegex,"xxxxxxxxxxx")
            return replacedText;
        }
        catch(err){
            console.log(err)
            return "There is some techinal issue"
        }
    }

    findError(data){
        const unhandledRegex = /Unhandled Exception occurred/
        const categoryIDRegex = /Category ID: \d+ in KYC Table/
        const someThingWentWrong = /Something went wrong/
        const TechnicalGlitchregex = /There seems to be a technical glitch/
        const internalServerError = /Internal Server Error/
        return unhandledRegex.test(data)?true:categoryIDRegex.test(data)?true:someThingWentWrong.test(data)?true:TechnicalGlitchregex.test(data)?true:internalServerError.test(data)?true:false;
    }

}

module.exports = new Regex()