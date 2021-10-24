import { Controller, Get, UseGuards, Query, ValidationPipe, UsePipes, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

import { MSTGMDsService } from './mst_gmds.service';
import { MST_GMD } from './mst_gmd.entity';
import { GetGMDFilterDto } from './dto/get-gmd-filter.dto';
import { PaginationParams } from 'src/utils/PaginationParams';
import { SortPipe } from 'src/utils/SortPipe.pipe';
import { Like } from 'typeorm';
import { CreateMSTGMDDto } from './dto/create-mst-gmd';
import { UpdateMSTGMDDto } from './dto/update-mst-gmd';

// @ApiBearerAuth()
@ApiTags('mst-gmd')
@Controller('mst-gmd')
// @UseGuards(AuthGuard())
export class MSTGMDsController {
  constructor(
    private MSTGMDsService: MSTGMDsService
  ) { }

  @Get()
  @ApiQuery({ name: 'take', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'sort', required: false })
  @ApiQuery({ name: 'gmd_name', required: false })
  @UsePipes(new SortPipe())
  getMSTGMDs(
    @Query() filterDto: GetGMDFilterDto,
    @Query('take') take: number,
    @Query('skip') skip: number
  ): Promise<MST_GMD[]> {
    delete filterDto["take"];
    delete filterDto["skip"];

    const sort = filterDto.sort;

    let filter = {}

    if (filterDto.gmd_name) {
      filter["gmd_name"] = Like(`%${filterDto.gmd_name}%`)
    }

    return this.MSTGMDsService.findAll(filter, sort, {
      take: take,
      skip: skip,
    });
  }

  @Get(':gmd_id')
  @ApiParam({ name: 'gmd_id' })
  getMSTGMDByGMDId(@Param('gmd_id') gmd_id: number): Promise<MST_GMD> {
    return this.MSTGMDsService.findOneWithoutNotFound({ gmd_id });
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createMSGMD(
    @Body() createMSTGMDDto: CreateMSTGMDDto,
  ): Promise<MST_GMD> {
    return this.MSTGMDsService.createMSTGMD(createMSTGMDDto);
  }

  @Put(':gmd_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateMSTGMDByGMDId(
    @Param('gmd_id') gmd_id: number,
    @Body() updateMSTGMDDto: UpdateMSTGMDDto,
  ): Promise<any> {
    return this.MSTGMDsService.updateMSTGMDByGMDId(gmd_id, updateMSTGMDDto);
  }

  @Delete(':gmd_id')
  @ApiParam({ name: 'gmd_id' })
  deleteMSTGMDByGMDId(@Param('gmd_id') gmd_id: number): Promise<any> {
    return this.MSTGMDsService.deleteOne({ gmd_id });
  }

}