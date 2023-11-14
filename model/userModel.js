module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
      userName: {
        type: DataTypes.STRING,
       
      },
      userEmail: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
//       confirmPassword:{
// type: DataTypes.STRING
//       }
      
    });
    return User;
  };