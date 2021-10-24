import { Controller, Get, UseGuards, Query, ValidationPipe, UsePipes, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

import { ItemsService } from './items.service';
import { Item } from './item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

// @ApiBearerAuth()
@ApiTags('item')
@Controller('item')
// @UseGuards(AuthGuard())
export class ItemsController {
    constructor(
        private itemsService: ItemsService
    ) { }

    @Get('item_code')
    @ApiQuery({ name: 'item_id', required: false })
    @ApiQuery({ name: 'item_code', required: false })
    getItemByItemCode(
        @Query('item_id') item_id: string,
        @Query('item_code') item_code: string,
    ): Promise<any> {
        return this.itemsService.getItemByItemCode(item_id, item_code);
    }

    @Get('biblio/:biblio_id')
    @ApiParam({ name: 'biblio_id', required: false })
    getItemByBiblioId(@Param('biblio_id') biblio_id: number): Promise<any> {
        return this.itemsService.getItemByBiblioId(biblio_id);
    }

    @Get(':item_id')
    @ApiParam({ name: 'item_id', required: false })
    getItemByItemId(@Param('item_id') item_id: number): Promise<Item> {
        return this.itemsService.findOneWithoutNotFound({ item_id });
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    createItem(
      @Body() createItemDto: CreateItemDto,
    ): Promise<Item> {
      return this.itemsService.createItem(createItemDto);
    }

    @Post('biblio/:biblio_id')
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiBody({ type: [CreateItemDto] })
    createItemByBiblioId(
        @Param('biblio_id') biblio_id: number,
        @Body() createItemDto: CreateItemDto[],
    ): Promise<any> {
        return this.itemsService.createItemByBiblioId(biblio_id, createItemDto);
    }

    @Put(':item_id')
    @UsePipes(new ValidationPipe({ transform: true }))
    updateItemByItemId(
        @Param('item_id') item_id: number,
        @Body() updateItemDto: UpdateItemDto,
    ): Promise<any> {
        return this.itemsService.updateItem({item_id}, updateItemDto);
    }

    @Delete(':item_id')
    @ApiParam({ name: 'item_id', required: false })
    async deleteMSTGMDByGMDId(@Param('item_id') item_id: number): Promise<any> {
        return await this.itemsService.deleteItem(item_id);
    }
}