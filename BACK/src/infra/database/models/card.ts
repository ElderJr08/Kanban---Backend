import { DataTypes } from "sequelize";

export const cardModelName = "Card";

export const cardModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING,
    autoIncrement: false,
    allowNull: false,
  },
  conteudo: {
    type: DataTypes.STRING,
    autoIncrement: false,
    allowNull: false,
  },
  lista: {
    type: DataTypes.STRING,
    autoIncrement: false,
    allowNull: false,
  },
};
