import { Controller, Get, UseGuards, Query, ValidationPipe, UsePipes, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

import { MSTTopicsService } from './mst_topics.service';
import { MST_Topic } from './mst_topic.entity';
import { SortPipe } from 'src/utils/SortPipe.pipe';
import { Like } from 'typeorm';
import { GetTopicFilterDto } from './dto/get-topic-filter.dto';
import { CreateMSTTopicDto } from './dto/create-mst-topic';
import { UpdateMSTTopicDto } from './dto/update-mst-topic';

// @ApiBearerAuth()
@ApiTags('mst-topic')
@Controller('mst-topic')
// @UseGuards(AuthGuard())
export class MSTTopicsController {
  constructor(
    private MSTTopicsService: MSTTopicsService
  ) { }

  @Get()
  @ApiQuery({ name: 'take', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'sort', required: false })
  @ApiQuery({ name: 'topic', required: false })
  @UsePipes(new SortPipe())
  getTopics(
    @Query() filterDto: GetTopicFilterDto,
    @Query('take') take: number,
    @Query('skip') skip: number
  ): Promise<MST_Topic[]> {
    delete filterDto["take"];
    delete filterDto["skip"];

    const sort = filterDto.sort;

    let filter = {}

    if (filterDto.topic) {
      filter["topic"] = Like(`%${filterDto.topic}%`)
    }

    return this.MSTTopicsService.findAll(filter, sort, {
      take: take,
      skip: skip,
    });
  }

  @Get(':topic_id')
  @ApiParam({ name: 'topic_id' })
  getMSTTopicByTopicId(@Param('topic_id') topic_id: number): Promise<MST_Topic> {
    return this.MSTTopicsService.findOneWithoutNotFound({ topic_id });
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createMSTTopic(
    @Body() createMSTTopicDto: CreateMSTTopicDto,
  ): Promise<MST_Topic> {
    return this.MSTTopicsService.createMSTTopic(createMSTTopicDto);
  }

  @Put(':topic_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateMSTTopicByTopicId(
    @Param('topic_id') topic_id: number,
    @Body() updateMSTTopicDto: UpdateMSTTopicDto,
  ): Promise<any> {
    return this.MSTTopicsService.updateMSTTopicByTopicId(topic_id, updateMSTTopicDto);
  }

  @Delete(':topic_id')
  @ApiParam({ name: 'topic_id', required: false })
  deleteMSTTopicByTopicId(@Param('topic_id') topic_id: number): Promise<any> {
    return this.MSTTopicsService.deleteOne({ topic_id });
  }
}