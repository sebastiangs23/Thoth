import { Sequelize, DataType, DataTypes } from "sequelize";
import db from "../../db/postgresql.js";
import UserTypeModel from "../userType/userTypeModel.js";

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
    native_country: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    residence_country: {
        type: DataTypes.STRING(30),
    },
    nationality: {
        type: DataTypes.STRING(30)
    }
});

UserModel.belongsTo(UserTypeModel, { foreignKey: 'fk_user_type' });

UserModel.sync({ alter: true });

export default UserModel;