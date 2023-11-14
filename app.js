const express=require("express")
const app=express()

//const { blogs } = require("./model/index")
//const { renderCreateBlog, createBlog, allBlogs, singleBlog, deleteBlog, renderEditBlog, editBlog } = require("./controller/blog/blogController")
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




app.listen(4000,()=>{
    console.log("node app started at PORT 4000")
})



