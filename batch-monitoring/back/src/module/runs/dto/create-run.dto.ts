import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateRunDto {
  @ApiProperty({ description: "UUID of the job this run belongs to" })
  @IsNotEmpty()
  @IsUUID()
  jobId!: string;

  @ApiProperty({
    description: "OpenLineage runId (UUID from originating system)",
    example: "d46e465b-d358-4d32-83d4-df660ff614dd",
  })
  @IsNotEmpty()
  @IsUUID()
  runId!: string;

  @ApiProperty({
    description: "Scheduled (nominal) start time of this run",
    example: "2024-01-15T08:00:00Z",
  })
  @IsNotEmpty()
  @IsDateString()
  nominalStartTime!: string;

  @ApiPropertyOptional({
    description: "Scheduled (nominal) end time of this run",
    example: "2024-01-15T09:00:00Z",
  })
  @IsOptional()
  @IsDateString()
  nominalEndTime?: string;

  @ApiPropertyOptional({ description: "OpenLineage run facets", type: "object" })
  @IsOptional()
  facets?: Record<string, unknown>;
}
