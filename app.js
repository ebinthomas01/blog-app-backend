const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcryptjs = require("bcryptjs")
const { blogmodel } = require("./models/blog")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://ebinthomas01:ebinthomas01@cluster0.te6dmsx.mongodb.net/blogDB?retryWrites=true&w=majority&appName=Cluster0")

const generateHashedPass = async (password) => {
    const salt = await bcryptjs.genSalt(10)
    return bcryptjs.hash(password, salt)
}

app.post("/signup", async (req, res) => {
    let input = req.body
    let HashedPass = await generateHashedPass(input.password)
    console.log(HashedPass)
    input.password = HashedPass
    let blog = new blogmodel(input)
    blog.save()
})

app.post("/signin", (req, res) => {
    let input = req.body
    blogmodel.find({ "email": req.body.email }).then(
        (response)=>{
            if (response.length>0) 
                {
                    let dbPassword= response[0].password
                    console.log(dbPassword)
                    bcryptjs.compare(input.password,dbPassword,(error,isMatch) =>{
                        if(isMatch)
                            {
                                res.json({"status":"Success","name":response[0]._id})
                            }
                        else
                            {
                                res.json({"status":"Incorrect Password"})
                            }
                    })
                }
            else
                {
                    res.json({"status":"User not Found"})
                }
        }
    ).catch()
})

app.listen(8080, () => {
    console.log("Server Running")
})