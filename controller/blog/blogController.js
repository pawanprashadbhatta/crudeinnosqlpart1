const { blogs, User } = require("../../model")
const express=require("express")
const app=express()
//form bata ke data audai xa tyo parse gar otherwise undefined aauxa so code
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//create blog ko form dekaune api
exports.renderCreateBlog=(req,res)=>{
    res.render("createBlog")
}

//blog create garne api
exports.createBlog=async(req,res)=>{
    
    console.log(req.user[0].id)
   // const {title,subTitle,description}=req.body
    const title=req.body.title
    const subTitle=req.body.subTitle
    const description=req.body.description
    
    
    await blogs.create({
        title:title,
        description:description,
        subTitle:subTitle,
        userId:req.user[0].id
    })
    
   res.redirect("/")
}

//allblog show garna api
exports.allBlogs=async(req,res)=>{
    const allBlogs=await blogs.findAll(
       {  include :
        {
        model:User
    }})
   console.log(allBlogs)
res.render("blogs",{blogs:allBlogs})  //blogs vanne key ma allBlogs lai pass gareko  file ejs ko lai
}

//single blog
exports.singleBlog=async(req,res)=>{
    
    // console.log(req.params.id)  kun blog maa  click garye tesko id console maa show garna lai
 const {id}=req.params
 //console.log(id)
 // tyo particular id maa aako data dey vanna lai
  const blog=    await blogs.findAll({
     where:{
          id:id
      } ,include:{
        model:User
      }})
 
 res.render('singleBlog.ejs',{singleBlogData:blog})
 }

 //delete blog
 exports.deleteBlog=async(req,res)=>{
    const {id}=req.params


    console.log(id)
    await blogs.destroy({
        where:{
            id:id
        }
    })
    
    res.redirect('/')
}

//render edt blog
exports.renderEditBlog=async(req,res)=>{
    const id=req.params.id
 //   console.log(id)
    //find data of that blog
   const blog=await blogs.findAll({
        where:{
            id:id
        }
    })
    res.render("editBlog",{blog:blog})
}
//edit blog
exports.editBlog=async(req,res)=>{
    const {id}=req.params
   // console.log(req.body)
  const {title,subTitle,description}=req.body
  {
    title,
    subTitle,
    description
  }
  await blogs.update({
    title,
    subTitle,
    description
  },
  {where:{
    id:id
  }})
  res.redirect("/")
}

exports.renderMyBlog=async(req,res)=>{
 //get this userid blogs
 const userId=req.userId
 //find blogs of this userid
 const myBlogs=await blogs.findAll({
    where:{
        userId:userId
    }
 })
 res.render("myBlog",{myBlogs:myBlogs })
}
