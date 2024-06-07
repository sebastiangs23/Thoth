import { Sequelize, DataType, DataTypes } from "sequelize";
import db from "../../db/postgresql.js";
import UserTypeModel from "../user_type/user_type_model.js";

const UserModel = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_user_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserTypeModel,
            key: 'id'
        }
    },
    name: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(25),
        allowNull: false,
    },
    second_last_name: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    birth_country: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    residence_country: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
});

UserModel.belongsTo(UserTypeModel, { foreignKey: 'id_user_type' });

UserModel.sync({ alter: false });

export default UserModel;