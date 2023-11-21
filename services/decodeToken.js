const {promisify}=require("util")
const jwt=require("jsonwebtoken")
exports.decodeToken=async(token,secret)=>{
    const decodedResult=await promisify (jwt.verify)(token,process.env.SECRETKEY)
    return decodedResult;
}