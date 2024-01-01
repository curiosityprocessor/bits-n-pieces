import {
  MYSQL_DATA_SOURCE,
  USER_REPOSITORY,
} from "@src/module/global/database/database.constants";
import { DataSource } from "typeorm";
import { User } from "../entities/user.entity";

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [MYSQL_DATA_SOURCE],
  },
];
