const express=require("express")
const boardRouter=express.Router()
const {BoardModel}=require('../model/board.model')

boardRouter.post("/create",async(req,res)=>{
    try {
        const {name}=req.body
        const board=new BoardModel({name})
        await board.save()
        res.json(board)
    } catch (error) {
        res.status(400).json({error:"Could not create new Board"})
    }
})

boardRouter.get("/",async(req,res)=>{
    try {
        const board=await BoardModel.find()
        res.json(board)
    } catch (error) {
        res.json({error:"Could not fetch Boards"})
    }
})

boardRouter.get("/singleboard/:boardId",async(req,res)=>{
    const {boardId}=req.params
    try {
        const board=await BoardModel.findById(boardId)
        if(!board){
            res.status(404).json({error:"Board not Found"})
            return
        }
        res.json(board)

    } catch (error) {
        res.status(400).json({error:"Could not get board"})
    }
})

boardRouter.put("/edit/:boardId",async(req,res)=>{
    const {boardId}=req.params
    try {
        const updateBoard=await BoardModel.findByIdAndUpdate(boardId,req.body,{new:true})
        if(!updateBoard){
            res.status(400).json({error:"Board not found"})
            return 
        }
        res.json(updateBoard)
    } catch (error) {
        res.status(500).json({error:"Could not update the board"})
    }
})

boardRouter.put("/delete/:boardId",async(req,res)=>{
    const {boardId}=req.params
    try {
        const board=await BoardModel.findById(boardId)
        if(!board){
            res.status(400).json({error:"Board not found"})
            return 
        }
        await board.remove()
        res.json({msg:"Board Deleted Successfully"})
    } catch (error) {
        res.status(500).json({error:"Could not delete the board"})
    }
})


module.exports={boardRouter}