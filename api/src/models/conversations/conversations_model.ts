import { DataTypes } from "sequelize";
import db from "../../db/postgresql.js";
import LanguageLevel from "../language_levels/language_levels_model.js";

const ConversationModel = db.define('conversation', {
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
            key:'id'
        }
    },
    context: {
        type: DataTypes.STRING(50),
        allowNull: false,
    }

});

ConversationModel.belongsTo(LanguageLevel, { foreignKey: 'id_language_level' } );

ConversationModel.sync({ alter: true });

export default ConversationModel;

