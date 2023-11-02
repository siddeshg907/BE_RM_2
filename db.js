
const mongoose=require("mongoose")

const connection=mongoose.connect(`mongodb+srv://siddeshgore907:siddesh907@sidcluster0.abmdmki.mongodb.net/kanban?retryWrites=true&w=majority`)

module.exports={
    connection
}