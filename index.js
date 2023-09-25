const express = require("express")
const cors = require("cors")
const connection = require("./db")
const {userRouter}=require("./routes/userRouter")
const {employeeRouter}=require("./routes/employeeRouter")



const app=express()
app.use(express.json())
app.use(cors())

app.use("/user",userRouter);
app.use("/employee",employeeRouter);

app.listen(8080,async()=>{
    try {
        await connection;
        console.log("connectedto db and running at post 8080")
    } catch (error) {
        console.log(error)
    }
})