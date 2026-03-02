import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateDatasetDto {
  @ApiProperty({ description: "Logical namespace (e.g. database host, S3 bucket)", example: "postgresql://prod-db" })
  @IsNotEmpty()
  @IsString()
  namespace!: string;

  @ApiProperty({ description: "Dataset name within the namespace (e.g. table name)", example: "public.orders" })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiPropertyOptional({ description: "OpenLineage dataset facets (schema, etc.)", type: "object" })
  @IsOptional()
  facets?: Record<string, unknown>;
}
