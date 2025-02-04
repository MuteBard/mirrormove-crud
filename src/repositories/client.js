const { MYSQL } = require('../../settings');
const { Sequelize, DataTypes, Op } = require('sequelize');

const options =  { define: { timestamps: false }}
const db = new Sequelize(MYSQL.connectionString, options);

function synchronize(){
    db
    .sync()
    .then(() => {
        console.log("models synchronized with database");
    })
    .catch((err) => {
        console.error("Error syncing model: ", err);
    });
}

exports.db = db;
exports.DataTypes = DataTypes;
exports.Sequelize = Sequelize;
exports.Op = Op;
exports.synchronize = synchronize;