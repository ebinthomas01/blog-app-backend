const mongoose= require("mongoose")

const schema=mongoose.Schema(
    {
        "name":{type:String,require:true},
        "email":{type:String,require:true},
        "password":{type:String,require:true}
    }
)
let blogmodel =mongoose.model("users",schema)
module.exports={blogmodel}