import { DataSource } from "typeorm";
import { POSTGRES_DATA_SOURCE } from "../../global/database/database.constants";
import { DATASET_REPOSITORY } from "../datasets.constants";
import { DatasetEntity } from "../entities/dataset.entity";

export const datasetProviders = [
  {
    provide: DATASET_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(DatasetEntity),
    inject: [POSTGRES_DATA_SOURCE],
  },
];
