const { User } = require("../../model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

//yo api le form dekaune honi
exports.renderRegisterUser=(req,res)=>{
    res.render("register")

}
exports.registerUser=async(req,res)=>{
    const {userName,userEmail,password,confirmPassword}=req.body
  if(password!==confirmPassword){
    return res.send("password and conformPassword doesn't match")
  }
   
 const userExist=await User.create({
    userName,
    userEmail,
   password:bcrypt.hashSync(password,8)

 })
 res.redirect('/login')
}

//login api
exports.renderLoginUser=(req,res)=>{
    res.render("login")

}
exports.loginUser=async(req,res)=>{
    const {userEmail,password}=req.body
    if(!userEmail||!password){
        res.send("provide email n passsword")
    }
    const associatedUserExists=await User.findAll({
        where:{
            userEmail
        }
    })
    //if not find then [] if find [{useremail:"khjkkj",password:"hkhj",username:"khkh"}] json hunxa
 if(associatedUserExists.length==0){
    res.redirect("register")
 }else{
const associatedpassword=associatedUserExists[0].password
const isMatched =bcrypt.compareSync(password,associatedpassword)
if(!isMatched){
    res.send("invalid email or password")
}else{
   const token= jwt.sign({id:associatedUserExists[0].id},process.env.SECRETKEY,{expiresIn:"5d"})
//    console.log(token) 
   //token vanne name or variabe baniyem ani jwt.sign method use garera method maa 2 object type banyeum 1 secrect key banyeum
   res.cookie('token',token) 
   res.send("logged in successful")
}

 }
}