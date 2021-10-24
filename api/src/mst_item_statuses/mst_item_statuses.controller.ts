import { Controller, Get, UseGuards, Query, ValidationPipe, UsePipes, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

import { MSTItemStatusesService } from './mst_item_statuses.service';
import { MST_Item_Status } from './mst_item_status.entity';
import { Like } from 'typeorm';
import { SortPipe } from 'src/utils/SortPipe.pipe';
import { GetItemStatusFilterDto } from './dto/get-item-status-filter.dto';
import { CreateMSTItemStatusDto } from './dto/create-mst-item-status';
import { UpdateMSTItemStatusDto } from './dto/update-mst-item-status';

// @ApiBearerAuth()
@ApiTags('mst-item-status')
@Controller('mst-item-status')
// @UseGuards(AuthGuard())
export class MSTItemStatusesController {
  constructor(
    private MSTItemStatusesService: MSTItemStatusesService
  ) { }

  @Get()
  @ApiQuery({ name: 'take', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'sort', required: false })
  @ApiQuery({ name: 'item_status_name', required: false })
  @UsePipes(new SortPipe())
  getItemStatuses(
    @Query() filterDto: GetItemStatusFilterDto,
    @Query('take') take: number,
    @Query('skip') skip: number
  ): Promise<MST_Item_Status[]> {
    delete filterDto["take"];
    delete filterDto["skip"];

    const sort = filterDto.sort;

    let filter = {}

    if (filterDto.item_status_name) {
      filter["item_status_name"] = Like(`%${filterDto.item_status_name}%`)
    }

    return this.MSTItemStatusesService.findAll(filter, sort, {
      take: take,
      skip: skip,
    });
  }

  @Get(':item_status_id')
  @ApiParam({ name: 'item_status_id', required: false })
  getMSTItemStatusByItemStatusId(@Param('item_status_id') item_status_id: string): Promise<MST_Item_Status> {
    return this.MSTItemStatusesService.findOneWithoutNotFound({ item_status_id });
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createItemStatus(
    @Body() createMSTItemStatusDto: CreateMSTItemStatusDto,
  ): Promise<MST_Item_Status> {
    return this.MSTItemStatusesService.createMSTItemStatus(createMSTItemStatusDto);
  }

  @Put(':item_status_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateMSTItemStatusByItemStatusId(
    @Param('item_status_id') item_status_id: string,
    @Body() updateMSTItemStatusDto: UpdateMSTItemStatusDto,
  ): Promise<any> {
    return this.MSTItemStatusesService.updateMSTItemStatusByItemStatusId(item_status_id, updateMSTItemStatusDto);
  }

  @Delete(':item_status_id')
  @ApiParam({ name: 'item_status_id', required: false })
  deleteMSTItemStatusByItemStatusId(@Param('item_status_id') item_status_id: string): Promise<any> {
    return this.MSTItemStatusesService.deleteOne({ item_status_id });
  }
}