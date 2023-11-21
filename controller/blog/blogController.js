const { blogs, User } = require("../../model")
const express=require("express")
const app=express()
const fs=require("fs")  //node ko inbuilt package to deal with files here used to delete file from uploads..
//form bata ke data audai xa tyo parse gar otherwise undefined aauxa so code
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//create blog ko form dekaune api
exports.renderCreateBlog=(req,res)=>{
    res.render("createBlog")
}

//blog create garne api
exports.createBlog=async(req,res)=>{
 // console.log(req.file)
   //console.log(req.user[0].id)
  
   // const {title,subTitle,description}=req.body
    const title=req.body.title
    const subTitle=req.body.subTitle
    const description=req.body.description
    
    if(!title || !description ||!subTitle || !req.file){
      return res.send(
          "Please provide title,description,subTitle,file"
      )
      const fileName=req.file.filename
  }




   
    await blogs.create({
        title:title,
        description:description,
        subTitle:subTitle,
        userId:req.user[0].id,
        // image:fileName
       // image:"http://localhost:4000/" + fileName
        image:process.env.BASE_URL + fileName
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
  // console.log(allBlogs)
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
    const userId=req.userId 
   // console.log(req.body)
  const {title,subTitle,description}=req.body
  const oldData= await blogs.findAll({
    where:{
      id:id
    }
  })
  if(oldData[0].userId!==userId){
    return res.send("yo cannot perform this task")
  }
  let fileurl;
  if(req.file){
    fileurl=process.env.BASE_URL + req.file.filename
const oldImagePath=oldData[0].image
const lengthOfUnwantedPath="http://localhost:4000/".length
const fileNameInUpload=oldImagePath.slice(lengthOfUnwantedPath)
fs.unlink("uploads/"+fileNameInUpload,(err)=>{
  if(err){
    console.log("error while deleting file")
  }else{
    console.log("file deleted successfulllllly")
  }
})
  }
  else{
    fileurl=oldData[0].image  //old file url
  }
  await blogs.update({
    title,
    subTitle,
    description,
    image:fileurl
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


