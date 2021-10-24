import { Controller, Get, UseGuards, Query, ValidationPipe, UsePipes, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

import { MSTMediaTypesService } from './mst_media_types.service';
import { MST_Media_Type } from './mst_media_type.entity';
import { SortPipe } from 'src/utils/SortPipe.pipe';
import { GetMediaTypeFilterDto } from './dto/get-media-type-filter.dto';
import { Like } from 'typeorm';
import { CreateMSTMediaTypeDto } from './dto/create-mst-media-type';
import { UpdateMSTMediaTypeDto } from './dto/update-mst-media-type';

// @ApiBearerAuth()
@ApiTags('mst-media-type')
@Controller('mst-media-type')
// @UseGuards(AuthGuard())
export class MSTMediaTypesController {
  constructor(
    private MSTMediaTypesService: MSTMediaTypesService
  ) { }

  @Get()
  @ApiQuery({ name: 'take', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'sort', required: false })
  @ApiQuery({ name: 'media_type', required: false })
  @UsePipes(new SortPipe())
  getMediaTypes(
    @Query() filterDto: GetMediaTypeFilterDto,
    @Query('take') take: number,
    @Query('skip') skip: number
  ): Promise<MST_Media_Type[]> {
    delete filterDto["take"];
    delete filterDto["skip"];

    const sort = filterDto.sort;

    let filter = {}

    if (filterDto.media_type) {
      filter["media_type"] = Like(`%${filterDto.media_type}%`)
    }

    return this.MSTMediaTypesService.findAll(filter, sort, {
      take: take,
      skip: skip,
    });
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: false })
  getMSTMediaTypeById(@Param('id') id: number): Promise<MST_Media_Type> {
    return this.MSTMediaTypesService.findOneWithoutNotFound({ id });
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createMediaType(
    @Body() createMSTMediaTypeDto: CreateMSTMediaTypeDto,
  ): Promise<MST_Media_Type> {
    return this.MSTMediaTypesService.createMSTMediaType(createMSTMediaTypeDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateMSTMediaTypeById(
    @Param('id') id: number,
    @Body() updateMSTMediaTypeDto: UpdateMSTMediaTypeDto,
  ): Promise<any> {
    return this.MSTMediaTypesService.updateMSTMediaTypeById(id, updateMSTMediaTypeDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', required: false })
  deleteMSTMediaTypeById(@Param('id') id: number): Promise<any> {
    return this.MSTMediaTypesService.deleteOne({ id });
  }
}