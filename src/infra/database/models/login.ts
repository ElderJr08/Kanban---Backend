import { DataTypes } from "sequelize";

export const loginModelName = "Login";

export const loginModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: false,
    allowNull: false,
  },
  login: {
    type: DataTypes.STRING,
    autoIncrement: false,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    autoIncrement: false,
    allowNull: false,
  },
};
