export interface Config {
  auth: {
    secret: string;
  };
}

const config: Config = {
  auth: {
    secret: "NGQ1OTUzNDU0MzUyNDU1NA", // BASE64 -> HEXA -> STRING
  },
};

export default config;
