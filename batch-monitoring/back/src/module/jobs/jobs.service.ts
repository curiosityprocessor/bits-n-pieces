import { Inject, Injectable, NotImplementedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { JOB_REPOSITORY } from "./jobs.constants";
import { JobEntity } from "./entities/job.entity";
import { CreateJobDto } from "./dto/create-job.dto";
import { UpdateJobDto } from "./dto/update-job.dto";

@Injectable()
export class JobsService {
  constructor(
    @Inject(JOB_REPOSITORY)
    private readonly jobRepo: Repository<JobEntity>,
  ) {}

  findAll(): Promise<JobEntity[]> {
    throw new NotImplementedException();
  }

  findOne(id: string): Promise<JobEntity> {
    throw new NotImplementedException();
  }

  findByNamespaceAndName(namespace: string, name: string): Promise<JobEntity> {
    throw new NotImplementedException();
  }

  create(dto: CreateJobDto): Promise<JobEntity> {
    throw new NotImplementedException();
  }

  update(id: string, dto: UpdateJobDto): Promise<JobEntity> {
    throw new NotImplementedException();
  }

  remove(id: string): Promise<void> {
    throw new NotImplementedException();
  }
}
