import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ItemService } from "./item.service";
import { CreateItemDto } from "./dto/create-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import { ApiOperation } from "@nestjs/swagger";

@Controller("item")
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @ApiOperation({
    summary: "상품을 생성한다",
    tags: ["item"],
  })
  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }

  @ApiOperation({
    summary: "상품 목록을 조회한다",
    tags: ["item"],
  })
  @Get()
  findAll() {
    return this.itemService.findAll();
  }

  @ApiOperation({
    summary: "상품 하나를 조회한다",
    // testing swagger implicit tags
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.itemService.findOne(+id);
  }

  // testing swagger implicit tags
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(+id, updateItemDto);
  }

  // testing swagger implicit tags
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.itemService.remove(+id);
  }
}
