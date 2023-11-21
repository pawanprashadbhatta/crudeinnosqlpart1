const multer=require("multer")
var storage=multer.diskStorage({
    destination:function(req,file,cb){
        //below line of code to validata filetype(memetype)
        const allowedFileType=["image/Png" , "image/jpg" ,"image/jpeg"]
        if(!allowedFileType.includes(file.mimetype)){
            cb(new  Error("Invalid file type .Please provide jpg,png, jpeg "))  //cb error
            return;
        }
cb(null,"./uploads/")
    },
filename:function(req,file,cb){
    cb(null,Date.now()+"-"+file.originalname )
}
})
module.exports={
    storage,
    multer
}