import { ApiProperty } from "@nestjs/swagger";

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
  uid: string;

  @ApiProperty({
    description: "이메일",
    type: String,
  })
  email: string;

  @ApiProperty({
    description: "닉네임",
    type: String,
    required: false,
  })
  nickname?: string;

  @ApiProperty({
    description: "비밀번호",
    type: String,
  })
  pw: string;

  @ApiProperty({
    description: "비밀번호 틀린 횟수",
    type: Number,
    default: 0,
  })
  pwFailCount: number;

  @ApiProperty({
    description: "계정 잠김 여부",
  })
  isAccountLocked: boolean;

  @ApiProperty({
    description: "사용자 상태",
    enum: Status,
  })
  status: Status;

  @ApiProperty({
    description: "최종 로그인 일시",
    type: Date,
  })
  lastLoginAt: Date;

  @ApiProperty({
    description: "생성 일시",
  })
  createdAt: Date;
}
