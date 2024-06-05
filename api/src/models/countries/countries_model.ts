import db from "../../db/postgresql.js";
import { DataTypes } from "sequelize";

const CountriesModel = db.define('countries', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    flag: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nationality: {
        type: DataTypes.STRING,
        allowNull: false
    },
    iso_code: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: false });

CountriesModel.sync({ alter: true });

export default CountriesModel;