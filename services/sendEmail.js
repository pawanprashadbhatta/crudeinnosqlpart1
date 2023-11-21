const nodemailer=require("nodemailer")
// var options={
//     userEmail:userEmail,
//     subject:"",
//     otp:""
// }
const sendEmail=async(options)=>{ 
var transporter=nodemailer.createTransport({
    service:"gmail",
    
    auth:{
        user:process.env.USER,
        pass:process.env.PASS

    }
})
const mailOptions={
    from:"pawanBhatta <pobbhatta@gmail.com>",
    to:options.userEmail,
    subject:options.subject,
    text:"your otp is"+options.otp
   
}
//console.log(mailOptions)
await transporter.sendMail(mailOptions)

}
module.exports=sendEmail;