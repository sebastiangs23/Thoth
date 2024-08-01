import db from "../../db/postgresql.js";
import { DataTypes } from "sequelize";
import SpecificTopics from "../specific_topic/specific_topic_model.js";
import LanguageLevel from "../language_levels/language_levels_model.js";

const Dialogs = db.define('dialogs', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_language_level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: LanguageLevel,
            key: 'id'
        }
    },
    id_specific_topic: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: SpecificTopics,
            key: 'id'
        }
    },
    person: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    dialog: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    order: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },    
});

Dialogs.belongsTo(SpecificTopics, { foreignKey: 'id_specific_topic' });
Dialogs.belongsTo(LanguageLevel, { foreignKey: 'id_language_level' });

Dialogs.sync({ alter: true });

export default Dialogs;