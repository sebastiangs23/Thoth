import db from "../../db/postgresql.js";
import { DataTypes } from "sequelize";

const ViewUserModel = db.define('view_users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id_user_type: {
        type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.STRING(20)
    },
    last_name: {
        type: DataTypes.STRING(25)
    },
    second_last_name: {
        type: DataTypes.STRING(25),
    },
    email: {
        type: DataTypes.STRING(60),
    },
    password: {
        type: DataTypes.STRING(30),
    },
    id_country: {
        type: DataTypes.INTEGER,
    },
    id_language_level: {
        type: DataTypes.INTEGER
    },
    avatar: {
        type: DataTypes.INTEGER,
    }
}, {
    timestamps: false
});

export default ViewUserModel;