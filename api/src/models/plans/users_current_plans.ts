import db from "../../db/postgresql.js";
import { DataTypes } from "sequelize";
import UserModel from "../users/user_model.js";
import Plans from "./plans.js";

const UserCurrentPlans = db.define('user_current_plan', {
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
    id_plan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Plans,
            key: 'id'
        }
    },
});

UserCurrentPlans.belongsTo(UserModel, { foreignKey: 'id_user'  });
UserCurrentPlans.belongsTo(Plans, { foreignKey: 'id_plan' } );

UserCurrentPlans.sync({ alter: true });

export default UserCurrentPlans;