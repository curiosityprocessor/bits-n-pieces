import { Inject, Injectable, NotImplementedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { DATASET_REPOSITORY } from "./datasets.constants";
import { DatasetEntity } from "./entities/dataset.entity";
import { CreateDatasetDto } from "./dto/create-dataset.dto";

@Injectable()
export class DatasetsService {
  constructor(
    @Inject(DATASET_REPOSITORY)
    private readonly datasetRepo: Repository<DatasetEntity>,
  ) {}

  findAll(): Promise<DatasetEntity[]> {
    throw new NotImplementedException();
  }

  findOne(id: string): Promise<DatasetEntity> {
    throw new NotImplementedException();
  }

  findByNamespaceAndName(namespace: string, name: string): Promise<DatasetEntity> {
    throw new NotImplementedException();
  }

  upsert(dto: CreateDatasetDto): Promise<DatasetEntity> {
    throw new NotImplementedException();
  }
}
