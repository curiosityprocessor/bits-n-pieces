import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";
import { IsOptional } from "class-validator";
import { Transform } from "class-transformer";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    description: "비밀번호 틀린 횟수",
    type: Number,
    default: 0,
  })
  @IsOptional()
  @Transform(({ value }) => value || 0)
  pwFailCount?: number;

  @ApiPropertyOptional({
    description: "계정 잠김 여부",
    type: Boolean,
    default: false,
  })
  @IsOptional()
  isAccountLocked?: boolean;

  @ApiPropertyOptional({
    description: "최종 로그인 일시",
    type: Date,
  })
  @IsOptional()
  lastLoginAt?: Date;
}
