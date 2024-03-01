type Dialect = "sqlite" | "mssql" | "oracle";

export interface Config {
  auth: {
    secret: string;
  };
  db: {
    dialect: Dialect;
    storage: string;
  };
}

const config: Config = {
  auth: {
    secret: "NGQ1OTUzNDU0MzUyNDU1NA", // BASE64 -> HEXA -> STRING
  },
  db: {
    dialect: "sqlite",
    storage: "./database.sqlite",
  },
};

export default config;
