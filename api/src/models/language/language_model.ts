import { DataTypes } from "sequelize";
import db from "../../db/postgresql.js";

const Language = db.define('languages', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    language: {
        type: DataTypes.STRING(20),
        allowNull: false
    },    
}, {
    timestamps: false
});

Language.sync({ alter: true });

export default Language;