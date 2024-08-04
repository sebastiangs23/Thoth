import db from "../../db/postgresql.js";
import { DataTypes } from "sequelize";

const Situation = db.define("situation", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    description: {
        type: DataTypes.STRING(40),
        allowNull: false,
    }
});

Situation.sync({ alter: true });

export default Situation;
