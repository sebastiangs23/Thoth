import db from "../../db/postgresql.js";
import { DataTypes } from "sequelize";
import Areas from "../areas/areas_model.js";

const SpecificTopics = db.define("specific_topics", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    id_area: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Areas,
            key: 'id'
        }
    }
});

SpecificTopics.belongsTo(Areas, { foreignKey: 'id_area' });

SpecificTopics.sync({ alter: true });

export default SpecificTopics;