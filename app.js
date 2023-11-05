const express=require("express")
const app=express()


//database connection
require("./model/index")
//form bata ke data audai xa tyo parse gar otherwise undefined aauxa so code
 app.use(express.json())
 app.use(express.urlencoded({extended:true}))
 // telling node js to set ejs 
app.set('view engine','ejs')

//allblogs ko lai 
app.get('/',(req,res)=>{
    res.render("blogs")
})

//createBlog ko lai 
app.get("/createBlog",(req,res)=>{
    res.render("createBlog")
  

})
//node maa halnu paro form data ui bata
app.post("/createBlog",(req,res)=>{
    console.log(req.body)
    console.log("hello world")
})

app.listen(4000,()=>{
    console.log("node app started at PORT 4000")
})