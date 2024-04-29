import { Sequelize,  DataTypes } from "sequelize";
import db from "../../db/postgresql.js";

const UserModel = db.define("user_type", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    role: {
        type: DataTypes.TEXT,
        allowNull: false,   
    },

});

UserModel.sync({ alter: true });

export default UserModel;
