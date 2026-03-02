import * as path from "path";
import { DataSource } from "typeorm";
import { POSTGRES_DATA_SOURCE } from "./database.constants";
import { getEnv, isNotProduction } from "@src/util/env.util";

export const databaseProviders = [
  {
    provide: POSTGRES_DATA_SOURCE,
    useFactory: async (): Promise<DataSource> => {
      const dataSource = new DataSource({
        type: "postgres",
        host: getEnv("PG_HOST"),
        port: Number(getEnv("PG_PORT")),
        username: getEnv("PG_USER"),
        password: getEnv("PG_PW"),
        database: getEnv("PG_DB"),
        entities: [path.resolve(__dirname, "..", "..", "**", "*.entity.js")],
        synchronize: isNotProduction(),
        logging: isNotProduction(),
      });
      return dataSource.initialize();
    },
  },
];
