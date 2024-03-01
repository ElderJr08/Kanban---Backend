import dotenv from "dotenv";
dotenv.config();

type Dialect = "sqlite" | "mssql" | "oracle";

export interface Config {
  port: string;
  auth: {
    secret: string;
  };
  db: {
    dialect: Dialect;
    storage: string;
  };
}

const config: Config = {
  port: process.env.PORT || "5000",
  auth: {
    secret: process.env.JWT_SECRET || "",
  },
  db: {
    dialect: (process.env.DB_DIALECT as Dialect) || "sqlite",
    storage: process.env.DB_STORAGE || "",
  },
};

export default config;
