import db from "../../db/postgresql.js";
import { DataTypes } from "sequelize";

const ConversationContext = db.define('conversation_context', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
});

ConversationContext.sync({ alter: true });

export default ConversationContext;