import { DataTypes } from "sequelize";

export const cardModelName = "Card";

export const cardModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    autoIncrement: false,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    autoIncrement: false,
    allowNull: false,
  },
  list: {
    type: DataTypes.STRING,
    autoIncrement: false,
    allowNull: false,
  },
};
