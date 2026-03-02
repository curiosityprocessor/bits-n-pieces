import { DataSource } from "typeorm";
import { POSTGRES_DATA_SOURCE } from "../../global/database/database.constants";
import { RUN_REPOSITORY } from "../runs.constants";
import { RunEntity } from "../entities/run.entity";

export const runProviders = [
  {
    provide: RUN_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(RunEntity),
    inject: [POSTGRES_DATA_SOURCE],
  },
];
