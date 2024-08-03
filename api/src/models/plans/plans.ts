import db from "../../db/postgresql.js";
import { DataTypes } from "sequelize";

const Plans = db.define("plans", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    price_usd: {
        type: DataTypes.DECIMAL(10,3),
        allowNull: false
    }
});

Plans.sync({ alter: true });

export default Plans;