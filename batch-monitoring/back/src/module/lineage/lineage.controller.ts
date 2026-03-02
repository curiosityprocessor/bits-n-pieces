import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { LineageService } from "./lineage.service";
import { CreateRunEventDto } from "./dto/run-event.dto";
import { LineageQueryDto } from "./dto/lineage-query.dto";

@ApiTags("lineage")
@Controller("lineage")
export class LineageController {
  constructor(private readonly lineageService: LineageService) {}

  /**
   * OpenLineage-compatible event ingestion endpoint.
   * Accepts START, COMPLETE, FAIL, and ABORT events to track run lifecycle
   * and dataset lineage automatically.
   */
  @Post("events")
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({
    summary: "Ingest an OpenLineage RunEvent",
    description:
      "Accepts OpenLineage-compliant events. On receipt: upserts job, creates/transitions run, " +
      "upserts input/output datasets, and records dataset lineage edges.",
  })
  ingestEvent(@Body() dto: CreateRunEventDto) {
    return this.lineageService.ingestEvent(dto);
  }

  /**
   * Resolve a directed lineage graph for a given job or dataset.
   */
  @Get("graph")
  @ApiOperation({
    summary: "Get lineage graph for a job or dataset",
    description:
      "Returns a directed graph of nodes (jobs and datasets) and edges " +
      "(read/write relationships) reachable within the specified depth.",
  })
  getLineageGraph(@Query() dto: LineageQueryDto) {
    return this.lineageService.getLineageGraph(dto);
  }
}
