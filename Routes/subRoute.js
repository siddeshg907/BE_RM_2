const express=require("express")
const { SubtaskModel } = require("../model/subtask.model")
const subtaskRouter=express.Router()



subtaskRouter.post("/create",async(req,res)=>{
    try {
        const {title,isCompleted }=req.body
        const subtask=new SubtaskModel({title,isCompleted})
        await subtask.save()
        res.json(subtask)
    } catch (error) {
        res.status(400).json({error:"Could not create new subtask"})
    }
})

subtaskRouter.get("/",async(req,res)=>{
    try {
        const subtask=await SubtaskModel.find()
        res.json(subtask)
    } catch (error) {
        res.json({error:"Could not fetch subtasks"})
    }
})

subtaskRouter.get("/singlesubtask/:subtaskId",async(req,res)=>{
    const {subtaskId}=req.params
    try {
        const subtask=await SubtaskModel.findById(subtaskId)
        if(!subtask){
            res.status(404).json({error:"subtask not Found"})
            return
        }
        res.json(subtask)

    } catch (error) {
        res.status(400).json({error:"Could not get subtask"})
    }
})

subtaskRouter.put("/edit/:subtaskId",async(req,res)=>{
    const {subtaskId}=req.params
    try {
        const updatesubtask=await SubtaskModel.findByIdAndUpdate(subtaskId,req.body,{new:true})
        if(!updatesubtask){
            res.status(400).json({error:"subtask not found"})
            return 
        }
        res.json(updatesubtask)
    } catch (error) {
        res.status(500).json({error:"Could not update the subtask"})
    }
})

subtaskRouter.put("/delete/:subtaskId",async(req,res)=>{
    const {subtaskId}=req.params
    try {
        const subtask=await SubtaskModel.findById(subtaskId)
        if(!subtask){
            res.status(400).json({error:"subtask not found"})
            return 
        }
        await subtask.remove()
        res.json({msg:"subtask Deleted Successfully"})
    } catch (error) {
        res.status(500).json({error:"Could not delete the subtask"})
    }
})


module.exports={subtaskRouter}