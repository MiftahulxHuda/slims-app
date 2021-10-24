import { Controller, Get, UseGuards, Query, ValidationPipe, UsePipes, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

import { MSTLanguagesService } from './mst_languages.service';
import { MST_Language } from './mst_language.entity';
import { SortPipe } from 'src/utils/SortPipe.pipe';
import { Like } from 'typeorm';
import { GetLanguageFilterDto } from './dto/get-language-filter.dto';
import { CreateMSTLanguageDto } from './dto/create-mst-language';
import { UpdateMSTLanguageDto } from './dto/update-mst-language';

// @ApiBearerAuth()
@ApiTags('mst-language')
@Controller('mst-language')
// @UseGuards(AuthGuard())
export class MSTLanguagesController {
  constructor(
    private MSTLanguagesService: MSTLanguagesService
  ) { }

  @Get()
  @ApiQuery({ name: 'take', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'sort', required: false })
  @ApiQuery({ name: 'language_name', required: false })
  @UsePipes(new SortPipe())
  getLanguages(
    @Query() filterDto: GetLanguageFilterDto,
    @Query('take') take: number,
    @Query('skip') skip: number
  ): Promise<MST_Language[]> {
    delete filterDto["take"];
    delete filterDto["skip"];

    const sort = filterDto.sort;

    let filter = {}

    if (filterDto.language_name) {
      filter["language_name"] = Like(`%${filterDto.language_name}%`)
    }

    return this.MSTLanguagesService.findAll(filter, sort, {
      take: take,
      skip: skip,
    });
  }

  @Get(':language_id')
  @ApiParam({ name: 'language_id', required: false })
  getMSTLanguageByLanguageId(@Param('language_id') language_id: string): Promise<MST_Language> {
    return this.MSTLanguagesService.findOneWithoutNotFound({ language_id });
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createLanguage(
    @Body() createMSTLanguageDto: CreateMSTLanguageDto,
  ): Promise<MST_Language> {
    return this.MSTLanguagesService.createMSTLanguage(createMSTLanguageDto);
  }

  @Put(':language_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateMSTLanguageByLanguageId(
    @Param('language_id') language_id: string,
    @Body() updateMSTLanguageDto: UpdateMSTLanguageDto,
  ): Promise<any> {
    return this.MSTLanguagesService.updateMSTLanguageById(language_id, updateMSTLanguageDto);
  }

  @Delete(':language_id')
  @ApiParam({ name: 'language_id', required: false })
  deleteMSTLanguageByLanguageId(@Param('language_id') language_id: string): Promise<any> {
    return this.MSTLanguagesService.deleteOne({ language_id });
  }
}