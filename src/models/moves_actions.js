const { db, DataTypes } = require("../repositories/client");

const table = "moves_actions";
const MoveAction = db.define(table, {
    move_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Moves",
            key: "id",
        },
    },
    action_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Actions",
            key: "id",
        },
    },
    loops: {
        type: DataTypes.INTEGER,
    },
});

exports.MoveAction = MoveAction;

