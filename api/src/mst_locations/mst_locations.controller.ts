import { Controller, Get, UseGuards, Query, ValidationPipe, UsePipes, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

import { MSTLocationsService } from './mst_locations.service';
import { MST_Location } from './mst_location.entity';
import { SortPipe } from 'src/utils/SortPipe.pipe';
import { GetLocationFilterDto } from './dto/get-location-filter.dto';
import { Like } from 'typeorm';
import { CreateMSTLocationDto } from './dto/create-mst-location';
import { UpdateMSTLocationDto } from './dto/update-mst-location';

// @ApiBearerAuth()
@ApiTags('mst-location')
@Controller('mst-location')
// @UseGuards(AuthGuard())
export class MSTLocationsController {
  constructor(
    private MSTLocationsService: MSTLocationsService
  ) { }
  
  @Get()
  @ApiQuery({ name: 'take', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'sort', required: false })
  @ApiQuery({ name: 'location_name', required: false })
  @UsePipes(new SortPipe())
  getLocations(
    @Query() filterDto: GetLocationFilterDto,
    @Query('take') take: number,
    @Query('skip') skip: number
  ): Promise<MST_Location[]> {
    delete filterDto["take"];
    delete filterDto["skip"];

    const sort = filterDto.sort;

    let filter = {}

    if (filterDto.location_name) {
      filter["location_name"] = Like(`%${filterDto.location_name}%`)
    }

    return this.MSTLocationsService.findAll(filter, sort, {
      take: take,
      skip: skip,
    });
  }

  @Get(':location_id')
  @ApiParam({ name: 'location_id', required: false })
  getMSTLocationByLocationId(@Param('location_id') location_id: string): Promise<MST_Location> {
    return this.MSTLocationsService.findOneWithoutNotFound({ location_id });
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createLocation(
    @Body() createMSTLocationDto: CreateMSTLocationDto,
  ): Promise<MST_Location> {
    return this.MSTLocationsService.createMSTLocation(createMSTLocationDto);
  }

  @Put(':location_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateMSTLocationByLocationId(
    @Param('location_id') location_id: string,
    @Body() updateMSTLocationDto: UpdateMSTLocationDto,
  ): Promise<any> {
    return this.MSTLocationsService.updateMSTLocationByLocationId(location_id, updateMSTLocationDto);
  }

  @Delete(':location_id')
  @ApiParam({ name: 'location_id', required: false })
  deleteMSTLocationById(@Param('location_id') location_id: string): Promise<any> {
    return this.MSTLocationsService.deleteOne({ location_id });
  }
}