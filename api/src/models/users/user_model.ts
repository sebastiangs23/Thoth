import { Sequelize, DataType, DataTypes } from "sequelize";
import db from "../../db/postgresql.js";
import UserTypeModel from "../user_type/user_type_model.js";
import CountriesModel from "../countries/countries_model.js";

//In a future I need to implement classes for the models
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
        type: DataTypes.STRING(100),
        allowNull: false
    },
    id_country: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: CountriesModel,
            key: 'id'
        }
    },
    avatar: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    emailVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    codeVerified: {
        type: DataTypes.STRING(6),
        allowNull: true
    }
});

UserModel.belongsTo(UserTypeModel, { foreignKey: 'id_user_type' });
UserModel.belongsTo(CountriesModel, { foreignKey: 'id_country' });

UserModel.sync({ alter: false });

export default UserModel;