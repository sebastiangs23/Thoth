import { DataTypes } from "sequelize";
import db from "../../db/postgresql.js";
import UserModel from "../users/user_model.js";

const usersDaysConnected = db.define('users_days_connected', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserModel,
            key: 'id'
        }
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true,
});

usersDaysConnected.belongsTo(UserModel, { foreignKey: 'id_user' });

usersDaysConnected.sync({ alter: true });

export default usersDaysConnected;