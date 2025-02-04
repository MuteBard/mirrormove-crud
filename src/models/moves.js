const { db, DataTypes, Sequelize } = require("../repositories/client");

const table = 'moves'
const Move = db.define(table, {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    is_hidden: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    description_: {
        type: DataTypes.TEXT,
    },
    seconds: {
        type: DataTypes.FLOAT,
    },
});

exports.Move = Move;

