const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("CONNECTED!!");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
// import model files
db.blogs = require("./blogModel.Js")(sequelize, DataTypes);
db.User = require("./userModel.js")(sequelize, DataTypes);
//relationship between blogs and user
db.User.hasMany(db.blogs)
db.blogs.belongsTo(db.User)

db.sequelize.sync({ force:false }).then(() => {
  console.log("yes re-sync done");
});

module.exports = db;