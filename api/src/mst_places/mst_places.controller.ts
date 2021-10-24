import { Controller, Get, UseGuards, Query, ValidationPipe, UsePipes, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

import { SortPipe } from 'src/utils/SortPipe.pipe';
import { Like } from 'typeorm';
import { MSTPlacesService } from './mst_places.service';
import { MST_Place } from './mst_place.entity';
import { GetPlaceFilterDto } from './dto/get-place-filter.dto';
import { CreateMSTPlaceDto } from './dto/create-mst-place';
import { UpdateMSTPlaceDto } from './dto/update-mst-place';

// @ApiBearerAuth()
@ApiTags('mst-place')
@Controller('mst-place')
// @UseGuards(AuthGuard())
export class MSTPlacesController {
  constructor(
    private MSTPlacesService: MSTPlacesService
  ) { }

  @Get()
  @ApiQuery({ name: 'take', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'sort', required: false })
  @ApiQuery({ name: 'place_name', required: false })
  @UsePipes(new SortPipe())
  getPlaces(
    @Query() filterDto: GetPlaceFilterDto,
    @Query('take') take: number,
    @Query('skip') skip: number
  ): Promise<MST_Place[]> {
    delete filterDto["take"];
    delete filterDto["skip"];

    const sort = filterDto.sort;

    let filter = {}

    if (filterDto.place_name) {
      filter["place_name"] = Like(`%${filterDto.place_name}%`)
    }

    return this.MSTPlacesService.findAll(filter, sort, {
      take: take,
      skip: skip,
    });
  }

  @Get(':place_id')
  @ApiParam({ name: 'place_id', required: false })
  getMSTPlaceByPlaceId(@Param('place_id') place_id: number): Promise<MST_Place> {
    return this.MSTPlacesService.findOneWithoutNotFound({ place_id });
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createPlace(
    @Body() createMSTPlaceDto: CreateMSTPlaceDto,
  ): Promise<MST_Place> {
    return this.MSTPlacesService.createMSTPlace(createMSTPlaceDto);
  }

  @Put(':place_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateMSTPlaceByPlaceId(
    @Param('place_id') place_id: number,
    @Body() updateMSTPlaceDto: UpdateMSTPlaceDto,
  ): Promise<any> {
    return this.MSTPlacesService.updateMSTPlaceById(place_id, updateMSTPlaceDto);
  }

  @Delete(':place_id')
  @ApiParam({ name: 'place_id', required: false })
  deleteMSTPlaceByPlaceId(@Param('place_id') place_id: number): Promise<any> {
    return this.MSTPlacesService.deleteOne({ place_id });
  }
}