module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
      userName: {
        type: DataTypes.STRING,
       
      },
      userEmail: {
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
        
      },
      password: {
        type: DataTypes.STRING,
      },
//       confirmPassword:{
// type: DataTypes.STRING  yo onform password not here bad aproach
//       }
otp:{
  type:DataTypes.STRING
},
otpGeneratedTime:{
  type:DataTypes.STRING
}
      
    });
    return User;
  };