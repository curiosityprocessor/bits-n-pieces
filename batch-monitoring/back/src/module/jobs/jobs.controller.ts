import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { JobsService } from "./jobs.service";
import { CreateJobDto } from "./dto/create-job.dto";
import { UpdateJobDto } from "./dto/update-job.dto";

@ApiTags("jobs")
@Controller("jobs")
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  @ApiOperation({ summary: "List all registered jobs" })
  findAll() {
    return this.jobsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a job by ID" })
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.jobsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Register a new job" })
  create(@Body() dto: CreateJobDto) {
    return this.jobsService.create(dto);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update job metadata" })
  update(@Param("id", ParseUUIDPipe) id: string, @Body() dto: UpdateJobDto) {
    return this.jobsService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a job and its run history" })
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.jobsService.remove(id);
  }
}
