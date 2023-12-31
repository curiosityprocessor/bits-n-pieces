import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiTags } from "@nestjs/swagger";
import logger from "../global/logger/winston.logger";

@ApiTags("user")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post("login")
  login(@Body() dto: UpdateUserDto) {
    logger.error(`testing custom winston logger ${JSON.stringify(dto)}`);
    logger.warn(`testing custom winston logger ${JSON.stringify(dto)}`);
    logger.info(`testing custom winston logger ${JSON.stringify(dto)}`);
    logger.debug(`testing custom winston logger ${JSON.stringify(dto)}`);
    return;
  }

  @Post("login/sns")
  loginSns(@Body() dto: UpdateUserDto) {
    return;
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }
}
