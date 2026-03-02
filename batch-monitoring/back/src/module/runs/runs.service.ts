import { Inject, Injectable, NotImplementedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { RUN_REPOSITORY } from "./runs.constants";
import { RunEntity } from "./entities/run.entity";
import { CreateRunDto } from "./dto/create-run.dto";
import { UpdateRunStateDto } from "./dto/update-run.dto";

@Injectable()
export class RunsService {
  constructor(
    @Inject(RUN_REPOSITORY)
    private readonly runRepo: Repository<RunEntity>,
  ) {}

  findAll(): Promise<RunEntity[]> {
    throw new NotImplementedException();
  }

  findOne(id: string): Promise<RunEntity> {
    throw new NotImplementedException();
  }

  findByJobId(jobId: string): Promise<RunEntity[]> {
    throw new NotImplementedException();
  }

  findByRunId(runId: string): Promise<RunEntity> {
    throw new NotImplementedException();
  }

  create(dto: CreateRunDto): Promise<RunEntity> {
    throw new NotImplementedException();
  }

  updateState(id: string, dto: UpdateRunStateDto): Promise<RunEntity> {
    throw new NotImplementedException();
  }
}
