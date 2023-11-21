const { blogs } = require("../model")

exports.isValidUser=async(req,res,next)=>{
    const userId=req.userId
    const id=req.params.id
   const oldData= await blogs.findAll({
    where:{
        id:id
    }
   })
   if(oldData[0].userId !==userId){
    return res.send("you cant perform this task..")
   }
   next()
}