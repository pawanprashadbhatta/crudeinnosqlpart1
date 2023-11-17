const express=require("express")
const app=express()
require("dotenv").config()//env fine install gareko npm bata and require and config gareko default config
//const { blogs } = require("./model/index")
//const { renderCreateBlog, createBlog, allBlogs, singleBlog, deleteBlog, renderEditBlog, editBlog } = require("./controller/blog/blogController")
const cookieParser=require("cookie-parser")
app.use(cookieParser()) //cookie parse garna lai code
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//routes here
const blogRoute=require("./routes/blogRoute")
const authRoute=require("./routes/authRoute")
app.use('',blogRoute)
app.use('',authRoute)  // localhost:4000/register --yo url type garda mero api hit hunxa alternative below
//app.use("/api",authroute)  //localhost:4000/api/register --yo url type garda aauthyo
//database connection
require("./model/index")

 // telling node js to set ejs 
app.set('view engine','ejs')


const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log("node app started at PORT "+{PORT})
})



//git maa upload folder remove garne command
//git rm -r --cached foldername