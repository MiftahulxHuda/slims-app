import { Controller, Get, UseGuards, Query, ValidationPipe, UsePipes, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

import { MST_Author } from './mst_author.entity';
import { MSTAuthorsService } from './mst_authors.service';
import { SortPipe } from 'src/utils/SortPipe.pipe';
import { GetAuthorFilterDto } from './dto/get-author-filter.dto';
import { Like } from 'typeorm';
import { CreateMSTAuthorDto } from './dto/create-mst-author';
import { UpdateMSTAuthorDto } from './dto/update-mst-author';

// @ApiBearerAuth()
@ApiTags('mst-author')
@Controller('mst-author')
// @UseGuards(AuthGuard())
export class MSTAuthorsController {
  constructor(
    private MSTAuthorsService: MSTAuthorsService
  ) { }

  @Get()
  @ApiQuery({ name: 'take', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'sort', required: false })
  @ApiQuery({ name: 'author_name', required: false })
  @UsePipes(new SortPipe())
  getAuthors(
    @Query() filterDto: GetAuthorFilterDto,
    @Query('take') take: number,
    @Query('skip') skip: number
  ): Promise<MST_Author[]> {
    delete filterDto["take"];
    delete filterDto["skip"];

    const sort = filterDto.sort;

    let filter = {}

    if (filterDto.author_name) {
      filter["author_name"] = Like(`%${filterDto.author_name}%`)
    }

    return this.MSTAuthorsService.findAll(filter, sort, {
      take: take,
      skip: skip,
    });
  }

  @Get(':author_id')
  @ApiParam({ name: 'author_id' })
  getMSTAuthorByAuthorId(@Param('author_id') author_id: number): Promise<MST_Author> {
    return this.MSTAuthorsService.findOneWithoutNotFound({ author_id });
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createMSTAuthor(
    @Body() createMSTAuthorDto: CreateMSTAuthorDto,
  ): Promise<MST_Author> {
    return this.MSTAuthorsService.createMSTAuthor(createMSTAuthorDto);
  }

  @Put(':author_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateMSTAuthorByAuthorId(
    @Param('author_id') author_id: number,
    @Body() updateMSTAuthorDto: UpdateMSTAuthorDto,
  ): Promise<any> {
    return this.MSTAuthorsService.updateMSTAuthorByAuthorId(author_id, updateMSTAuthorDto);
  }

  @Delete(':author_id')
  @ApiParam({ name: 'author_id' })
  deleteMSTAuthorByAuthorId(@Param('author_id') author_id: number): Promise<any> {
    return this.MSTAuthorsService.deleteMSTAuthorByAuthorId(author_id);
  }
}