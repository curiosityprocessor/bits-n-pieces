import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, Max, Min } from "class-validator";
import { Transform } from "class-transformer";

export class LineageQueryDto {
  @ApiPropertyOptional({ description: "Dataset namespace to start lineage traversal from" })
  @IsOptional()
  @IsString()
  namespace?: string;

  @ApiPropertyOptional({ description: "Dataset name to start lineage traversal from" })
  @IsOptional()
  @IsString()
  datasetName?: string;

  @ApiPropertyOptional({ description: "Job namespace to start lineage traversal from" })
  @IsOptional()
  @IsString()
  jobNamespace?: string;

  @ApiPropertyOptional({ description: "Job name to start lineage traversal from" })
  @IsOptional()
  @IsString()
  jobName?: string;

  @ApiPropertyOptional({
    description: "Number of upstream/downstream hops to traverse (default: 3, max: 10)",
    minimum: 1,
    maximum: 10,
    default: 3,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  @Max(10)
  depth?: number;
}
