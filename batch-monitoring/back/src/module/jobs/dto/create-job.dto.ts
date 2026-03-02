import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateJobDto {
  @ApiProperty({ description: "Logical namespace / owning system", example: "airflow" })
  @IsNotEmpty()
  @IsString()
  namespace!: string;

  @ApiProperty({ description: "Unique job name within the namespace", example: "etl.orders.daily" })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiPropertyOptional({ description: "Human-readable description of the job" })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: "OpenLineage job facets (arbitrary metadata)",
    type: "object",
  })
  @IsOptional()
  facets?: Record<string, unknown>;
}
