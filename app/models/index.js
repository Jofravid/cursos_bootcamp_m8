const Sequelize = require('sequelize');
const db = require('../config/db.config');

// Modelamos la base datos
const sequelize = new Sequelize(db.database, db.user, db.password,{
    host: db.host,
    dialect: db.dialect
});

// Definimos las relaciones entre las tablas
const db_rel = {}

db_rel.Sequelize = Sequelize;
db_rel.sequelize = sequelize;

db_rel.users = require('./user.model')(sequelize, Sequelize);
db_rel.bootcamps = require('./bootcamp.model')(sequelize, Sequelize);

db_rel.users.belongsToMany(db_rel.bootcamps, {
    through: "user_bootcamp",
    as: "bootcamps",
    foreignKey: "user_id",
  });
db_rel.bootcamps.belongsToMany(db_rel.users, {
    through: "user_bootcamp",
    as: "users",
    foreignKey: "bootcamp_id",
  });
  
module.exports = db_rel;