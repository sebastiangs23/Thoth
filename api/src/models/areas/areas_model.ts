import { DataTypes } from "sequelize";
import db from "../../db/postgresql.js";

const Areas = db.define('areas', {
    id: {
        type:  DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

Areas.sync({ alter: true });

export default Areas;