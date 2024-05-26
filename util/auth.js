module.exports =(req,res,next)=>{
    const token = req.headers['x-api-grip-gpt']
    try{
        
        if(token!=process.env.AUTHGRIP){
            throw new Error("Unauthorized Token")
        }
        next()
    }
    catch(err){
        console.log("Unauthorized")
        res.status(401).json({"msg":"Not Authorized.Please use Authorize token"})
    }
}