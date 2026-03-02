import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

export enum EventType {
  START = "START",
  COMPLETE = "COMPLETE",
  FAIL = "FAIL",
  ABORT = "ABORT",
  OTHER = "OTHER",
}

export class RunFacetDto {
  @ApiProperty({ description: "OpenLineage run ID (UUID)" })
  @IsNotEmpty()
  @IsString()
  runId!: string;

  @ApiPropertyOptional({ description: "Run facets", type: "object" })
  @IsOptional()
  facets?: Record<string, unknown>;
}

export class JobFacetDto {
  @ApiProperty({ description: "Job namespace" })
  @IsNotEmpty()
  @IsString()
  namespace!: string;

  @ApiProperty({ description: "Job name" })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiPropertyOptional({ description: "Job facets", type: "object" })
  @IsOptional()
  facets?: Record<string, unknown>;
}

export class DatasetFacetDto {
  @ApiProperty({ description: "Dataset namespace" })
  @IsNotEmpty()
  @IsString()
  namespace!: string;

  @ApiProperty({ description: "Dataset name" })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiPropertyOptional({ description: "Dataset facets", type: "object" })
  @IsOptional()
  facets?: Record<string, unknown>;

  @ApiPropertyOptional({ description: "Input-specific facets", type: "object" })
  @IsOptional()
  inputFacets?: Record<string, unknown>;

  @ApiPropertyOptional({ description: "Output-specific facets", type: "object" })
  @IsOptional()
  outputFacets?: Record<string, unknown>;
}

/**
 * OpenLineage RunEvent — the primary ingestion payload.
 * @see https://openlineage.io/spec/1-0-5/OpenLineage.json
 */
export class CreateRunEventDto {
  @ApiProperty({
    description: "OpenLineage schema URL",
    example: "https://openlineage.io/spec/1-0-5/OpenLineage.json",
  })
  @IsNotEmpty()
  @IsUrl()
  schemaURL!: string;

  @ApiProperty({
    description: "ISO-8601 timestamp when the event was emitted",
    example: "2024-01-15T08:00:00.000Z",
  })
  @IsNotEmpty()
  @IsDateString()
  eventTime!: string;

  @ApiProperty({ enum: EventType, description: "Lifecycle event type" })
  @IsNotEmpty()
  @IsEnum(EventType)
  eventType!: EventType;

  @ApiProperty({ type: RunFacetDto })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => RunFacetDto)
  run!: RunFacetDto;

  @ApiProperty({ type: JobFacetDto })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => JobFacetDto)
  job!: JobFacetDto;

  @ApiProperty({ type: [DatasetFacetDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DatasetFacetDto)
  inputs!: DatasetFacetDto[];

  @ApiProperty({ type: [DatasetFacetDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DatasetFacetDto)
  outputs!: DatasetFacetDto[];

  @ApiPropertyOptional({ description: "Top-level event facets", type: "object" })
  @IsOptional()
  facets?: Record<string, unknown>;
}
