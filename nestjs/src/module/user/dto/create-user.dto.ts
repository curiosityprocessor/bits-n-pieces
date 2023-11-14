import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
} from "class-validator";

enum Status {
  NORMAL = "normal",
  DORMANT = "dormant",
  WITHDRAWN = "withdrawn",
}

export class CreateUserDto {
  @ApiProperty({
    description: "사용자ID",
  })
  @IsNotEmpty()
  uid: string;

  @ApiProperty({
    description: "이메일",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    description: "닉네임",
  })
  @IsOptional()
  nickname?: string;

  @ApiProperty({
    description: "비밀번호",
    example: "St0ngP@55w0rd!",
  })
  @IsNotEmpty()
  @IsStrongPassword()
  pw: string;

  @ApiProperty({
    description: "비밀번호 틀린 횟수",
    type: Number,
    default: 0,
  })
  @IsNotEmpty()
  pwFailCount: number;

  @ApiProperty({
    description: "계정 잠김 여부",
    type: Boolean,
    default: false,
  })
  @IsNotEmpty()
  isAccountLocked: boolean;

  @ApiProperty({
    description: "사용자 상태",
    enum: Status,
    default: Status.NORMAL,
  })
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;

  @ApiProperty({
    description: "최종 로그인 일시",
    type: Date,
  })
  @IsNotEmpty()
  lastLoginAt: Date;

  @ApiProperty({
    description: "생성 일시",
  })
  @IsNotEmpty()
  createdAt: Date;
}
