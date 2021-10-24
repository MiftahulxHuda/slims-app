import { Controller, Get, UseGuards, Query, ValidationPipe, UsePipes, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

import { MSTCarrierTypesService } from './mst_carrier_types.service';
import { MST_Carrier_Type } from './mst_carrier_type.entity';
import { SortPipe } from 'src/utils/SortPipe.pipe';
import { GetCarrierTypeFilterDto } from './dto/get-carrier-type-filter.dto';
import { Like } from 'typeorm';
import { CreateMSTCarrierTypeDto } from './dto/create-mst-carrier-type';
import { UpdateMSTCarrierTypeDto } from './dto/update-mst-carrier-type';

// @ApiBearerAuth()
@ApiTags('mst-carrier-type')
@Controller('mst-carrier-type')
// @UseGuards(AuthGuard())
export class MSTCarrierTypesController {
  constructor(
    private MSTCarrierTypesService: MSTCarrierTypesService
  ) { }

  @Get()
  @ApiQuery({ name: 'take', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'sort', required: false })
  @ApiQuery({ name: 'carrier_type', required: false })
  @UsePipes(new SortPipe())
  getCarrierTypes(
    @Query() filterDto: GetCarrierTypeFilterDto,
    @Query('take') take: number,
    @Query('skip') skip: number
  ): Promise<MST_Carrier_Type[]> {
    delete filterDto["take"];
    delete filterDto["skip"];

    const sort = filterDto.sort;

    let filter = {}

    if (filterDto.carrier_type) {
      filter["carrier_type"] = Like(`%${filterDto.carrier_type}%`)
    }

    return this.MSTCarrierTypesService.findAll(filter, sort, {
      take: take,
      skip: skip,
    });
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: false })
  getMSTCarrierTypeById(@Param('id') id: number): Promise<MST_Carrier_Type> {
    return this.MSTCarrierTypesService.findOneWithoutNotFound({ id });
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createCarrierType(
    @Body() createMSTCarrierTypeDto: CreateMSTCarrierTypeDto,
  ): Promise<MST_Carrier_Type> {
    return this.MSTCarrierTypesService.createMSTCarrierType(createMSTCarrierTypeDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateMSTCarrierTypeById(
    @Param('id') id: number,
    @Body() updateMSTCarrierTypeDto: UpdateMSTCarrierTypeDto,
  ): Promise<any> {
    return this.MSTCarrierTypesService.updateMSTCarrierTypeById(id, updateMSTCarrierTypeDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', required: false })
  deleteMSTCarrierTypeById(@Param('id') id: number): Promise<any> {
    return this.MSTCarrierTypesService.deleteOne({ id });
  }
}