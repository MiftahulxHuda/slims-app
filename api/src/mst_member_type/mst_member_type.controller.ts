import { Controller, Get, UseGuards, Query, ValidationPipe, UsePipes, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

import { SortPipe } from 'src/utils/SortPipe.pipe';
import { Like } from 'typeorm';
import { MSTMemberTypeService } from './mst_member_type.service';

// @ApiBearerAuth()
@ApiTags('mst-member-type')
@Controller('mst-member-type')
// @UseGuards(AuthGuard())
export class MSTMemberTypeController {
  constructor(
    private mstMemberTypeService: MSTMemberTypeService
  ) { }

  @Get()
  getMemberType(): Promise<any> {
    return this.mstMemberTypeService.find({});
  }
}