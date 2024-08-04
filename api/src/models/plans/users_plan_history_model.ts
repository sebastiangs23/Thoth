import db from "../../db/postgresql.js";
import { DataTypes } from "sequelize";
import UserModel from "../user_type/user_type_model.js";
import Plans from "./plans_model.js";

const UserPlanHistory = db.define('users_plan_history', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserModel,
            key: 'id'
        }
    },
    id_plan_purchased: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Plans,
            key: 'id'
        }
    },
    purchase_day: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_of_plan: {
        type: DataTypes.DATE,
        allowNull: false
    },
});

UserPlanHistory.belongsTo(UserModel, { foreignKey: 'id_user' });
UserPlanHistory.belongsTo(Plans, { foreignKey: 'id_plan_purchased' });

UserPlanHistory.sync({alter: true});

export default UserPlanHistory;