import { Controller, Get, UseGuards, Query, ValidationPipe, UsePipes, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

import { MSTSuppliersService } from './mst_suppliers.service';
import { MST_Supplier } from './mst_supplier.entity';
import { SortPipe } from 'src/utils/SortPipe.pipe';
import { GetSupplierFilterDto } from './dto/get-supplier-filter.dto';
import { Like } from 'typeorm';
import { CreateMSTSupplierDto } from './dto/create-mst-supplier';
import { UpdateMSTSupplierDto } from './dto/update-mst-supplier';

// @ApiBearerAuth()
@ApiTags('mst-supplier')
@Controller('mst-supplier')
// @UseGuards(AuthGuard())
export class MSTSuppliersController {
  constructor(
    private MSTSuppliersService: MSTSuppliersService
  ) { }

  @Get()
  @ApiQuery({ name: 'take', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'sort', required: false })
  @ApiQuery({ name: 'supplier_name', required: false })
  @UsePipes(new SortPipe())
  getSuppliers(
    @Query() filterDto: GetSupplierFilterDto,
    @Query('take') take: number,
    @Query('skip') skip: number
  ): Promise<MST_Supplier[]> {
    delete filterDto["take"];
    delete filterDto["skip"];

    const sort = filterDto.sort;

    let filter = {}

    if (filterDto.supplier_name) {
      filter["supplier_name"] = Like(`%${filterDto.supplier_name}%`)
    }

    return this.MSTSuppliersService.findAll(filter, sort, {
      take: take,
      skip: skip,
    });
  }

  @Get(':supplier_id')
  @ApiParam({ name: 'supplier_id', required: false })
  getMSTSupplierBySupplierId(@Param('supplier_id') supplier_id: number): Promise<MST_Supplier> {
    return this.MSTSuppliersService.findOneWithoutNotFound({ supplier_id });
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createMSTSupplier(
    @Body() createMSTSupplierDto: CreateMSTSupplierDto,
  ): Promise<MST_Supplier> {
    return this.MSTSuppliersService.createMSTSupplier(createMSTSupplierDto);
  }

  @Put(':supplier_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateMSTSupplierBySupplierId(
    @Param('supplier_id') supplier_id: number,
    @Body() updateMSTSupplierDto: UpdateMSTSupplierDto,
  ): Promise<any> {
    return this.MSTSuppliersService.updateMSTSupplierBySupplierId(supplier_id, updateMSTSupplierDto);
  }

  @Delete(':supplier_id')
  @ApiParam({ name: 'supplier_id', required: false })
  deleteMSTSupplierBySupplierId(@Param('supplier_id') supplier_id: number): Promise<any> {
    return this.MSTSuppliersService.deleteOne({ supplier_id });
  }
}