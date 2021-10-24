import { Controller, Get, UseGuards, Query, ValidationPipe, UsePipes, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

import { SortPipe } from 'src/utils/SortPipe.pipe';
import { Like } from 'typeorm';
import { SettingService } from './setting.service';
import { Setting } from './setting.entity';

// @ApiBearerAuth()
@ApiTags('setting')
@Controller('setting')
// @UseGuards(AuthGuard())
export class SettingController {
  constructor(
    private settingService: SettingService
  ) { }

  @Get('item-code-pattern')
  getItemCodePattern(): Promise<any> {
    return this.settingService.getItemCodePattern();
  }

  @Post('item-code-pattern')
  createItemCodePattern(
    @Body() createItemCodePatternDto: Object,
  ): Promise<any> {
    return this.settingService.createItemCodePattern(createItemCodePatternDto);
  }

  // @Put(':author_id')
  // @UsePipes(new ValidationPipe({ transform: true }))
  // updateMSTAuthorByAuthorId(
  //   @Param('author_id') author_id: number,
  //   @Body() updateMSTAuthorDto: UpdateMSTAuthorDto,
  // ): Promise<any> {
  //   return this.MSTAuthorsService.updateMSTAuthorByAuthorId(author_id, updateMSTAuthorDto);
  // }

  // @Delete(':author_id')
  // @ApiParam({ name: 'author_id', required: false })
  // deleteMSTAuthorByAuthorId(@Param('author_id') author_id: number): Promise<any> {
  //   return this.MSTAuthorsService.deleteMSTAuthorByAuthorId(author_id);
  // }
}