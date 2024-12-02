import db from "../../db/postgresql.js";
import { DataTypes } from "sequelize";
import Areas from "../areas/areas_model.js";

const Situation = db.define("situation", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    description: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    id_area: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Areas,
            key: 'id' 
        }
    }
});

Situation.belongsTo(Areas, { foreignKey: 'id_area' });

Situation.sync({ alter: true });

export default Situation;
