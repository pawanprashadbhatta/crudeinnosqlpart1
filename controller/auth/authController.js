const { User } = require("../../model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const sendEmail = require("../../services/sendEmail")

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

exports.logout=(req,res)=>{
    res.clearCookie('token')
    res.redirect("/")
  }

  exports.renderForgotPassword=(req,res)=>{
    res.render("forgotPassword")
  }

  exports.checkForgotPassword=async(req,res)=>{
    const userEmail=req.body.userEmail
    //validate if email is given or not
    if(!userEmail){
     res.send("please enter email.")
   }
   //if email deyo vane form bata databse ko table maa tyo email check garna we
const userExist=await User.findAll({
    where:{
        userEmail:userEmail
    }
})
if(userExist==0){
    res.send("no email found please register first..")
}
else{
    const otpGenerated=Math.floor(1000*Math.random(9999))
   // console.log(otpGenerated)
    //deyeko and vetyeko email ma otp pathaune
    sendEmail({
        userEmail:userEmail,
        subject:"password recovery otp,",
        otp:otpGenerated
    })
    userExist[0].otp=otpGenerated
    userExist[0].otpGeneratedTime=Date.now()  //time milisecond ma save hunxa
    await userExist[0].save()//save garna above 2 line of code 
    res.redirect("/otp?userEmail="+userEmail)
}
  }


  exports.renderOtpForm=(req,res)=>{
    const userEmail=req.query.userEmail
    res.render("otp",{userEmail:userEmail})
  }
  
  exports.handleOtp=async(req,res)=>{
const userEmail=req.params.id

const otp= req.body.otp


if(!otp ||!userEmail){
   return res.send("please send otp and id")
}
// try{ 
const userData=  await User.findAll({
    where:{
        userEmail:userEmail,
        otp:otp
    }
  })

  console.log("User Data:", userData);
  if(userData.length== 0){
    res.send("invalid otp")
  }else{
    const currentTime=Date.now()//current time
    const otpGeneratedTime=userData[0].otpGeneratedTime//past time
    if(currentTime-otpGeneratedTime<=120000){
//       userData[0].otp=null
//       userData[0].otpGeneratedTime=null
// await userData[0].save()
        // res.redirect("/changePassword?userEmail="+userEmail)
        res.redirect(`/changePassword?userEmail=${userEmail}&otp=${otp}`)
       console.log(`otp and email is ${otp},${userEmail}`)
       
    }else{
        res.send("otp has been expired")
    }
  }
// }
  // catch (error) {
  //   console.error("Database Error:", error);
  //   res.status(500).send("Internal Server Error");
  // }
  }

  //changepassword api
  exports.renderChangePassword=(req,res)=>{
    const userEmail = req.query.userEmail
    const otp = req.query.otp 
    console.log(req.query.userEmail,req.query.otp)
    console.log(otp,userEmail)
    if(!userEmail || !otp){
      return res.send("Email and otp should be provided in the query")
  }
    res.render("changePassword",{userEmail,otp})
  }
//handle change password
  exports.handlePasswordChange=async(req,res)=>{
  const {otp,userEmail}=req.params
  console.log(req.params)
 
     
    const {newPassword,confirmPassword}=req.body
   
    console.log(` newPassword and confirmPassword email and otp=${newPassword}, ${confirmPassword} ${userEmail} ${otp}`)
    if(!newPassword||!confirmPassword ||!userEmail ||!otp){
      return res.send("please provide newPassword and confirm Password")
    }
    
    if(newPassword !==confirmPassword){
res.send("new password and confirm password doesnt match")
    }

 
  //match vayo vanee
  // approach one to update password
  const hashedNewPassword=bcrypt.hashSync(newPassword,8)
  const userData=await User.findAll(
    {
      userEmail:userEmail
    }
  )

  userData[0].password=hashedNewPassword
  userData[0].save()
  //next approach
//   await User.update({
    
//       password:hashNewPassword
//   },{ 
//   where:{
//     userEmail:userEmail
//   }
// })
res.redirect("/login")
}


