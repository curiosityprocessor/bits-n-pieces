import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { RunsService } from "./runs.service";
import { CreateRunDto } from "./dto/create-run.dto";
import { UpdateRunStateDto } from "./dto/update-run.dto";

@ApiTags("runs")
@Controller("runs")
export class RunsController {
  constructor(private readonly runsService: RunsService) {}

  @Get()
  @ApiOperation({ summary: "List all runs, optionally filtered by jobId" })
  @ApiQuery({ name: "jobId", required: false, description: "Filter runs by job UUID" })
  findAll(@Query("jobId") jobId?: string) {
    if (jobId) return this.runsService.findByJobId(jobId);
    return this.runsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a run by ID" })
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.runsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create a new run record" })
  create(@Body() dto: CreateRunDto) {
    return this.runsService.create(dto);
  }

  @Patch(":id/state")
  @ApiOperation({ summary: "Transition a run's lifecycle state (RUNNING → COMPLETE | FAILED | ABORTED)" })
  updateState(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: UpdateRunStateDto,
  ) {
    return this.runsService.updateState(id, dto);
  }
}
