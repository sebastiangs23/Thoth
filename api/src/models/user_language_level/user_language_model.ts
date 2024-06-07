import db from "../../db/postgresql.js";
import { DataTypes } from "sequelize";
import UserModel from "../users/user_model.js";
import LanguageLevel from "../language_levels/language_levels_model.js";

const UserLanguageLevel = db.define(
  "users_language_levels",
  {
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
      },
    },
    id_language_level: {
      type: DataTypes.INTEGER,
      allowNull: true, //At the beggining it will be empty for the trigger
      references: {
        model: LanguageLevel,
        key: "id",
      },
    },
  },
);

UserLanguageLevel.belongsTo(UserModel, { foreignKey: "id_user" });
UserLanguageLevel.belongsTo(LanguageLevel, { foreignKey: "id_language_level" });

UserLanguageLevel.sync({ alter: true });

export default UserLanguageLevel;
