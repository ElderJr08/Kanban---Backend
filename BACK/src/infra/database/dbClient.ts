import { ModelAttributes, Sequelize } from "sequelize";
import config, { Config } from "../../config";
import { IDatabaseClient } from "./repositories/interfaces";

export default class DatabaseClient implements IDatabaseClient {
  private static instance: IDatabaseClient | null;
  private client: Sequelize | null;
  private appConfig: Config;

  constructor(appConfig: Config = config) {
    this.appConfig = appConfig;
    this.client = new Sequelize({
      dialect: this.appConfig.db.dialect,
      storage: this.appConfig.db.storage,
    });
  }

  public static getInstance(config?: Config) {
    if (!this.instance) {
      this.instance = new DatabaseClient(config);
    }
    return this.instance;
  }

  async load(): Promise<void> {
    await this.client?.sync();
  }

  async define<T extends ModelAttributes>(modelName: string, model: T) {
    if (this.client) {
      const modelDb = this.client.define(modelName, model);
      await this.load();
      return modelDb;
    }
    return null;
  }
}
