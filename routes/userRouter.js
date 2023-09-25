const express = require("express")
const {UserModel}= require("../model/userModel")
const bcrypt  = require("bcrypt")
const jwt=require("jsonwebtoken")
const userRouter = express.Router()


userRouter.post("/signup", async(req,res)=>{
    const {email,pass}=req.body
    try{
        bcrypt.hash(pass,5,async(err,hash)=>{
            if(err){
                res.send({error:err})
            }else{
                const user = new UserModel({email,pass:hash})
                await user.save()
                res.send({msg:"New User has been added"})
            }
        })
    }catch(error){
        res.send({error:error})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    try {
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(pass,user.pass,(err,result)=>{
                if(result){
                    const token = jwt.sign({couser:"NEM"},"masai")
                    res.send({msg:"Login Successfull",token:token})
                }else{
                    res.send({error:err})
                }
            })
        }else{
            res.send({msg:"User Doesnot exist"})
        }
    } catch (error) {
        res.send({error:error})
    }
})

module.exports={
    userRouter
}