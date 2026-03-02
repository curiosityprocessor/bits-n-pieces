import { DataSource } from "typeorm";
import { POSTGRES_DATA_SOURCE } from "../../global/database/database.constants";
import { JOB_REPOSITORY } from "../jobs.constants";
import { JobEntity } from "../entities/job.entity";

export const jobProviders = [
  {
    provide: JOB_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(JobEntity),
    inject: [POSTGRES_DATA_SOURCE],
  },
];
