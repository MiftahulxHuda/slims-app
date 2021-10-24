import { Controller, Get, UseGuards, Query, ValidationPipe, UsePipes, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

import { MSTFrequenciesService } from './mst_frequencies.service';
import { MST_Frequency } from './mst_frequency.entity';
import { SortPipe } from 'src/utils/SortPipe.pipe';
import { GetFrequencyFilterDto } from './dto/get-frequency-filter.dto';
import { Like } from 'typeorm';
import { CreateMSTFrequencyDto } from './dto/create-mst-frequency';
import { UpdateMSTFrequencyDto } from './dto/update-mst-frequency';

// @ApiBearerAuth()
@ApiTags('mst-frequency')
@Controller('mst-frequency')
// @UseGuards(AuthGuard())
export class MSTFrequenciesController {
  constructor(
    private MSTFrequenciesService: MSTFrequenciesService
  ) { }

  @Get()
  @ApiQuery({ name: 'take', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'sort', required: false })
  @ApiQuery({ name: 'frequency', required: false })
  @UsePipes(new SortPipe())
  getFrequencies(
    @Query() filterDto: GetFrequencyFilterDto,
    @Query('take') take: number,
    @Query('skip') skip: number
  ): Promise<MST_Frequency[]> {
    delete filterDto["take"];
    delete filterDto["skip"];
    
    const sort = filterDto.sort;
    delete filterDto["sort"];

    let filter = {}

    // if (filterDto.frequency) {
    //   filter["frequency"] = Like(`%${filterDto.frequency}%`)
    // }

    // return this.MSTFrequenciesService.findAll(filter, sort, {
    //   take: take,
    //   skip: skip,
    // });
    
    return this.MSTFrequenciesService.getFrequencies(filterDto, sort, {
      take: take,
      skip: skip,
    });
  }

  @Get(':frequency_id')
  @ApiParam({ name: 'frequency_id' })
  getMSTFrequencyByFrequencyId(@Param('frequency_id') frequency_id: number): Promise<MST_Frequency> {
    return this.MSTFrequenciesService.findOneWithoutNotFound({ frequency_id });
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createMSTFrequency(
    @Body() createMSTFrequencyDto: CreateMSTFrequencyDto,
  ): Promise<MST_Frequency> {
    return this.MSTFrequenciesService.createMSTFrequency(createMSTFrequencyDto);
  }

  @Put(':frequency_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateMSTFrequencyByFrequencyId(
    @Param('frequency_id') frequency_id: number,
    @Body() updateMSTFrequencyDto: UpdateMSTFrequencyDto,
  ): Promise<any> {
    return this.MSTFrequenciesService.updateMSTFrequencyByFrequencyId(frequency_id, updateMSTFrequencyDto);
  }

  @Delete(':frequency_id')
  @ApiParam({ name: 'frequency_id' })
  deleteMSTFrequencyByFrequencyId(@Param('frequency_id') frequency_id: number): Promise<any> {
    return this.MSTFrequenciesService.deleteOne({ frequency_id });
  }
}