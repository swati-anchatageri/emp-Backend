const jwt = require("jsonwebtoken")

const auth =  async(req,res,next)=>{
    const token  = req.headers.authorization.split(" ")[1]
    if(token){
        const decoded=jwt.verify(token,"masai")
        if(decoded){
            console.log(decoded)
            next()
        }else{
            res.send({msg:"Please Login"})
        }
    }else{
        res.send({msg:"Please Login"})
    }
}

module.exports={
    auth
}