import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { RunState } from "../entities/run.entity";

export class UpdateRunStateDto {
  @ApiProperty({
    description: "New run state",
    enum: RunState,
    example: RunState.COMPLETE,
  })
  @IsNotEmpty()
  @IsEnum(RunState)
  state!: RunState;

  @ApiPropertyOptional({
    description: "Timestamp when the run ended",
    example: "2024-01-15T09:05:12Z",
  })
  @IsOptional()
  @IsDateString()
  endedAt?: string;

  @ApiPropertyOptional({
    description: "Updated run facets (e.g. error message facet on failure)",
    type: "object",
  })
  @IsOptional()
  facets?: Record<string, unknown>;
}
