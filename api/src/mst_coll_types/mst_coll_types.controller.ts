import { Controller, Get, UseGuards, Query, ValidationPipe, UsePipes, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

import { MSTCollTypesService } from './mst_coll_types.service';
import { MST_Coll_Type } from './mst_coll_type.entity';
import { SortPipe } from 'src/utils/SortPipe.pipe';
import { GetCollTypeFilterDto } from './dto/get-coll-type-filter.dto';
import { Like } from 'typeorm';
import { CreateMSTCollTypeDto } from './dto/create-mst-coll-type';
import { UpdateMSTCollTypeDto } from './dto/update-mst-coll-type';

// @ApiBearerAuth()
@ApiTags('mst-coll-type')
@Controller('mst-coll-type')
// @UseGuards(AuthGuard())
export class MSTCollTypesController {
  constructor(
    private MSTCollTypesService: MSTCollTypesService
  ) { }

  @Get()
  @ApiQuery({ name: 'take', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'sort', required: false })
  @ApiQuery({ name: 'coll_type_name', required: false })
  @UsePipes(new SortPipe())
  getPlaces(
    @Query() filterDto: GetCollTypeFilterDto,
    @Query('take') take: number,
    @Query('skip') skip: number
  ): Promise<MST_Coll_Type[]> {
    delete filterDto["take"];
    delete filterDto["skip"];

    const sort = filterDto.sort;

    let filter = {}

    if (filterDto.coll_type_name) {
      filter["coll_type_name"] = Like(`%${filterDto.coll_type_name}%`)
    }

    return this.MSTCollTypesService.findAll(filter, sort, {
      take: take,
      skip: skip,
    });
  }

  @Get(':coll_type_id')
  @ApiParam({ name: 'coll_type_id', required: false })
  getMSTCollTypeByCollTypeId(@Param('coll_type_id') coll_type_id: number): Promise<MST_Coll_Type> {
    return this.MSTCollTypesService.findOneWithoutNotFound({ coll_type_id });
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createPlace(
    @Body() createMSTCollTypeDto: CreateMSTCollTypeDto,
  ): Promise<MST_Coll_Type> {
    return this.MSTCollTypesService.createMSTCollType(createMSTCollTypeDto);
  }

  @Put(':coll_type_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateMSTCollTypeByCollTypeId(
    @Param('coll_type_id') coll_type_id: number,
    @Body() updateMSTCollTypeDto: UpdateMSTCollTypeDto,
  ): Promise<any> {
    return this.MSTCollTypesService.updateMSTCollTypeById(coll_type_id, updateMSTCollTypeDto);
  }

  @Delete(':coll_type_id')
  @ApiParam({ name: 'coll_type_id', required: false })
  deleteMSTCollTypeByCollTypeId(@Param('coll_type_id') coll_type_id: number): Promise<any> {
    return this.MSTCollTypesService.deleteOne({ coll_type_id });
  }
}