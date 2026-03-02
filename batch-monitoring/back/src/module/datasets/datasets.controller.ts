import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { DatasetsService } from "./datasets.service";
import { CreateDatasetDto } from "./dto/create-dataset.dto";

@ApiTags("datasets")
@Controller("datasets")
export class DatasetsController {
  constructor(private readonly datasetsService: DatasetsService) {}

  @Get()
  @ApiOperation({ summary: "List all registered datasets" })
  findAll() {
    return this.datasetsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a dataset by UUID" })
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.datasetsService.findOne(id);
  }

  @Get(":namespace/:name")
  @ApiOperation({ summary: "Get a dataset by namespace and name" })
  findByNamespaceAndName(
    @Param("namespace") namespace: string,
    @Param("name") name: string,
  ) {
    return this.datasetsService.findByNamespaceAndName(namespace, name);
  }

  @Post()
  @ApiOperation({ summary: "Register or update a dataset (upsert by namespace+name)" })
  upsert(@Body() dto: CreateDatasetDto) {
    return this.datasetsService.upsert(dto);
  }
}
