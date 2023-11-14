import { ApiProperty } from "@nestjs/swagger";
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
    type: String,
  })
  @IsNotEmpty()
  uid: string;

  @ApiProperty({
    description: "이메일",
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "닉네임",
    type: String,
    required: false,
  })
  @IsOptional()
  nickname?: string;

  @ApiProperty({
    description: "비밀번호",
    type: String,
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
  })
  @IsNotEmpty()
  isAccountLocked: boolean;

  @ApiProperty({
    description: "사용자 상태",
    enum: Status,
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
