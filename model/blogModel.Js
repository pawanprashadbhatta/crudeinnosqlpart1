module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define("blog", {
      title: {
        type: DataTypes.STRING,
        
      },
      subTitle: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      image:{
        type:DataTypes.STRING
      }
    });
    return Blog;
  };