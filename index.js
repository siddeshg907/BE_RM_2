const express=require("express")
const { connection } = require("./db")
const { boardRouter } = require("./Routes/boardRoute")
const { taskRouter } = require("./Routes/taskRoute")
const { subtaskRouter } = require("./Routes/subRoute")
const cors=require("cors")

const app=express()
app.use(cors())

app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).json({msg:"This is Home page"})
})

app.use("/boards",boardRouter)
app.use("/tasks",taskRouter)
app.use("/subtasks",subtaskRouter)


app.listen(8080,async()=>{
    
    try {
        await connection
        console.log("Connected to DB")
        console.log("server is running on port 8080")

    } catch (error) {
        console.log(error)
    }
})