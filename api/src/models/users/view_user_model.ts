import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import db from "../../db/postgresql.js";
interface ViewUserInstance extends Model<InferAttributes<ViewUserInstance>, InferCreationAttributes<ViewUserInstance>> {
  id: number;
  id_user_type: number;
  name: string;
  last_name: string;
  second_last_name: string;
  email: string;
  password: string;
  id_country: number;
  id_language_level: number;
  avatar: number;
  emailVerified: boolean;
  codeVerified: string;
}

const ViewUserModel = db.define<ViewUserInstance>('view_users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  id_user_type: {
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING(20),
  },
  last_name: {
    type: DataTypes.STRING(25),
  },
  second_last_name: {
    type: DataTypes.STRING(25),
  },
  email: {
    type: DataTypes.STRING(60),
  },
  password: {
    type: DataTypes.STRING(100),
  },
  id_country: {
    type: DataTypes.INTEGER,
  },
  id_language_level: {
    type: DataTypes.INTEGER,
  },
  avatar: {
    type: DataTypes.INTEGER,
  },
  emailVerified: {
    type: DataTypes.BOOLEAN,
  },
  codeVerified: {
    type: DataTypes.STRING(6),
  },
}, {
  timestamps: false,
});

export default ViewUserModel;
export { ViewUserInstance };
