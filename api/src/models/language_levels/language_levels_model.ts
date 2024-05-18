import db from "../../db/postgresql.js";
import { DataTypes } from "sequelize";

const LanguageLevel = db.define('language_levels', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    level: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    description_cefr: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {timestamps: false});

LanguageLevel.sync({ alter: true });

export default LanguageLevel;