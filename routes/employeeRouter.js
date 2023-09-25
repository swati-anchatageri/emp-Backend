const express = require("express")
const {EmpModel}=require("../model/employeeModel")

const {auth} = require("../middleware/auth.middleware")

const employeeRouter=express.Router()

employeeRouter.use(auth)

employeeRouter.post("/create",async(req,res)=>{
    try{
        const emp = new EmpModel(req.body)
        await emp.save()
        res.send({msg:"New Employee is added"})
    }catch(err){
        res.send({"err":err})
    }
})

employeeRouter.get("/",async(req,res)=>{
    try {
        const employees=await EmpModel.find()
        res.send(employees)
    } catch (error) {
        res.send({error:error})
    }
})

employeeRouter.patch("/edit/:empId",async(req,res)=>{
    const {empId}= req.params
    const emp = await EmpModel.findOne({_id:empId})
    try{
        await EmpModel.findByIdAndUpdate({_id:empId}, req.body)
        res.send({msg:"Employee is updated "})
    }catch(err){
        res.send({error:err.message})
    }
})


employeeRouter.delete("/delete/:empId",async(req,res)=>{
    const {empId}= req.params
    const emp = await EmpModel.findOne({_id:empId})
    try{
        await EmpModel.findByIdAndDelete({_id:empId})
        res.send({msg:"Employee is deleted "})
    }catch(err){
        res.send({error:err.message})
    }
})
module.exports={
    employeeRouter
}