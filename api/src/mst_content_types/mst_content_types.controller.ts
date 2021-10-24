import { Controller, Get, UseGuards, Query, ValidationPipe, UsePipes, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { Like } from 'typeorm';

import { MSTContentTypesService } from './mst_content_types.service';
import { MST_Content_Type } from './mst_content_type.entity';
import { SortPipe } from 'src/utils/SortPipe.pipe';
import { GetContentTypeFilterDto } from './dto/get-content-type-filter.dto';
import { CreateMSTContentTypeDto } from './dto/create-mst-content-type';
import { UpdateMSTGMDDto } from 'src/mst_gmds/dto/update-mst-gmd';
import { UpdateMSTContentTypeDto } from './dto/update-mst-content-type';

// @ApiBearerAuth()
@ApiTags('mst-content-type')
@Controller('mst-content-type')
// @UseGuards(AuthGuard())
export class MSTContentTypesController {
  constructor(
    private MSTContentTypesService: MSTContentTypesService
  ) { }

  @Get()
  @ApiQuery({ name: 'take', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'sort', required: false })
  @ApiQuery({ name: 'content_type', required: false })
  @UsePipes(new SortPipe())
  getContentTypes(
    @Query() filterDto: GetContentTypeFilterDto,
    @Query('take') take: number,
    @Query('skip') skip: number
  ): Promise<MST_Content_Type[]> {
    delete filterDto["take"];
    delete filterDto["skip"];

    const sort = filterDto.sort;

    let filter = {}

    if (filterDto.content_type) {
      filter["content_type"] = Like(`%${filterDto.content_type}%`)
    }

    return this.MSTContentTypesService.findAll(filter, sort, {
      take: take,
      skip: skip,
    });
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  getMSTContentTypeById(@Param('id') id: number): Promise<MST_Content_Type> {
    return this.MSTContentTypesService.findOneWithoutNotFound({ id });
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createContentType(
    @Body() createMSTContentTypeDto: CreateMSTContentTypeDto,
  ): Promise<MST_Content_Type> {
    return this.MSTContentTypesService.createMSTContentType(createMSTContentTypeDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateMSTContentTypeById(
    @Param('id') id: number,
    @Body() updateMSTContentTypeDto: UpdateMSTContentTypeDto,
  ): Promise<any> {
    return this.MSTContentTypesService.updateMSTContentTypeById(id, updateMSTContentTypeDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  deleteMSTContentTypeById(@Param('id') id: number): Promise<any> {
    return this.MSTContentTypesService.deleteOne({ id });
  }
}