import db from "../../db/postgresql.js";
import { DataTypes } from "sequelize";
import ConversationModel from "../conversations/conversations_model.js";

const Dialogs = db.define('dialogs', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_conversation: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ConversationModel,
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

Dialogs.belongsTo(ConversationModel, { foreignKey: 'id_conversation' });

Dialogs.sync({ alter: true });

export default Dialogs;