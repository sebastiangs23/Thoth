import { DataTypes } from "sequelize";
import db from "../../db/postgresql";
import UserModel from "../user_type/user_type_model";

const usersConnectedDays = db.define('users_connected_days', {
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
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: false
});

usersConnectedDays.belongsTo(UserModel, { foreignKey: 'id_user' });

usersConnectedDays.sync({ alter: true });

export default usersConnectedDays;