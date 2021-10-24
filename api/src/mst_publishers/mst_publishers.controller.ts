import { Controller, Get, UseGuards, Query, ValidationPipe, UsePipes, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

import { MSTPublishersService } from './mst_publishers.service';
import { MST_Publisher } from './mst-publisher.entity';
import { CreateMSTPublisherDto } from './dto/create-mst-publisher';
import { SortPipe } from 'src/utils/SortPipe.pipe';
import { GetPublisherFilterDto } from './dto/get-publisher-filter.dto';
import { Like } from 'typeorm';
import { UpdateMSTPublisherDto } from './dto/update-mst-publisher';

// @ApiBearerAuth()
@ApiTags('mst-publisher')
@Controller('mst-publisher')
// @UseGuards(AuthGuard())
export class MSTPublishersController {
  constructor(
    private MSTPublishersService: MSTPublishersService
  ) { }

  @Get()
  @ApiQuery({ name: 'take', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'sort', required: false })
  @ApiQuery({ name: 'publisher_name', required: false })
  @UsePipes(new SortPipe())
  getPublishers(
    @Query() filterDto: GetPublisherFilterDto,
    @Query('take') take: number,
    @Query('skip') skip: number
  ): Promise<MST_Publisher[]> {
    delete filterDto["take"];
    delete filterDto["skip"];

    const sort = filterDto.sort;

    let filter = {}

    if (filterDto.publisher_name) {
      filter["publisher_name"] = Like(`%${filterDto.publisher_name}%`)
    }

    return this.MSTPublishersService.findAll(filter, sort, {
      take: take,
      skip: skip,
    });
  }

  @Get(':publisher_id')
  @ApiParam({ name: 'publisher_id', required: false })
  getMSTPublisherByPublisherId(@Param('publisher_id') publisher_id: number): Promise<MST_Publisher> {
    return this.MSTPublishersService.findOneWithoutNotFound({ publisher_id });
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createMSTPublisher(
    @Body() createMSTPublisherDto: CreateMSTPublisherDto,
  ): Promise<MST_Publisher> {
    return this.MSTPublishersService.createMSTPublisher(createMSTPublisherDto);
  }

  @Put(':publisher_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateMSTPublisherByPublisherId(
    @Param('publisher_id') publisher_id: number,
    @Body() updateMSTPublisherDto: UpdateMSTPublisherDto,
  ): Promise<any> {
    return this.MSTPublishersService.updateMSTPublisherByPublisherId(publisher_id, updateMSTPublisherDto);
  }

  @Delete(':publisher_id')
  @ApiParam({ name: 'publisher_id', required: false })
  deleteMSTPublisherByPublisherId(@Param('publisher_id') publisher_id: number): Promise<any> {
    return this.MSTPublishersService.deleteOne({ publisher_id });
  }
}