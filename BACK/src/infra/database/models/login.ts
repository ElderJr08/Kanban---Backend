import { DataTypes } from "sequelize";

export const loginModelName = "Login";

export const loginModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  login: {
    type: DataTypes.STRING,
    autoIncrement: false,
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING,
    autoIncrement: false,
    allowNull: false,
  },
};
