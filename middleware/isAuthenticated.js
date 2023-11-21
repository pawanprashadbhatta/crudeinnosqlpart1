const jwt=require("jsonwebtoken")
// const promisify=require("util").promisify
// destructure garda above code 
const {promisify}=require("util")
const { User } = require("../model")
const { decode } = require("punycode")
const { decodeToken } = require("../services/decodeToken")
exports.isAuthenticated=async(req,res,next)=>{
const token=req.cookies.token
// check if token given or not
if(!token){
   return res.send("go for login first")
}
// verify if token is ligit or not
const decodedResult=await decodeToken(token,process.env.SECRETKEY)
//console.log(decodedResult)
//check if that userid(id) users table ma exist garxa vanera
const userExist=await User.findAll({
    where:{
        id:decodedResult.id
    }
}) 
if(userExist.length==0){
    res.send("user with that token doesnot exist")
}else{
    req.user=userExist;
    req.userId=userExist[0].id
    //console.log(req.userId)
    next()
}


}