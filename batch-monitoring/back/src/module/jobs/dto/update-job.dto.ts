import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateJobDto {
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
