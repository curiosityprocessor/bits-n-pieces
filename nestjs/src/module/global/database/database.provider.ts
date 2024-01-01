import * as path from "path";
import { DataSource } from "typeorm";
import {
  MYSQL_DATA_SOURCE,
  MYSQL,
} from "@src/module/global/database/database.constants";
import { getEnv, isNotProduction } from "@src/util/env.util";

export const databaseProviders = [
  {
    provide: MYSQL_DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: MYSQL,
        host: getEnv("MYSQL_HOST"),
        port: Number(getEnv("MYSQL_PORT")),
        username: getEnv("MYSQL_USER"),
        password: getEnv("MYSQL_PW"),
        database: getEnv("MYSQL_DB"),
        entities: [path.resolve(__dirname, "..", "..", "**", "*.entity.js")],
        synchronize: isNotProduction(),
      });

      return dataSource.initialize();
    },
  },
];
