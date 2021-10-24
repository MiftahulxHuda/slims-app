import { IsOptional, IsIn, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetSupplierFilterDto {
  @IsOptional()
  supplier_name: string;

  @IsOptional()
  sort: string;
}