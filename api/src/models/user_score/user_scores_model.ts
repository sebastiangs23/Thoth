import db from "../../db/postgresql.js";
import { DataTypes } from "sequelize";
import UserModel from "../users/user_model.js";
import Dialogs from "../dialogs/dialogs-model.js";

const UserScores = db.define('users_scores', {
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
            key: "id",
        }
    },
    id_dialog: { //In case the id_dialog == null, thats mean that its a chatgpt dialog
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Dialogs,
            key: "id",
        }
    },
    score: {
        type: DataTypes.JSON,
        allowNull: false,
    },
});

UserScores.belongsTo(UserModel, { foreignKey: "id_user" });
UserScores.belongsTo(Dialogs,  { foreignKey: "id_dialog" });

UserScores.sync({alter: true});

export default UserScores;