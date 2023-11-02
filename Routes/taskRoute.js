const express=require("express")
const taskRouter=express.Router()

const { TaskModel } = require("../model/task.model")

taskRouter.post("/create",async(req,res)=>{
    try {
        const {title,description,status,subtask}=req.body
        const task=new TaskModel({title,description,status,subtask})
        await task.save()
        res.json(task)
    } catch (error) {
        res.status(400).json({error:"Could not create new task"})
    }
})

taskRouter.get("/",async(req,res)=>{
    try {
        const task=await TaskModel.find()
        res.json(task)
    } catch (error) {
        res.json({error:"Could not fetch tasks"})
    }
})

taskRouter.get("/singletask/:taskId",async(req,res)=>{
    const {taskId}=req.params
    try {
        const task=await TaskModel.findById(taskId)
        if(!task){
            res.status(404).json({error:"task not Found"})
            return
        }
        res.json(task)

    } catch (error) {
        res.status(400).json({error:"Could not get task"})
    }
})

taskRouter.put("/edit/:taskId",async(req,res)=>{
    const {taskId}=req.params
    try {
        const updatetask=await TaskModel.findByIdAndUpdate(taskId,req.body,{new:true})
        if(!updatetask){
            res.status(400).json({error:"task not found"})
            return 
        }
        res.json(updatetask)
    } catch (error) {
        res.status(500).json({error:"Could not update the task"})
    }
})

taskRouter.put("/delete/:taskId",async(req,res)=>{
    const {taskId}=req.params
    try {
        const task=await TaskModel.findById(taskId)
        if(!task){
            res.status(400).json({error:"task not found"})
            return 
        }
        await task.remove()
        res.json({msg:"task Deleted Successfully"})
    } catch (error) {
        res.status(500).json({error:"Could not delete the task"})
    }
})


module.exports={taskRouter}