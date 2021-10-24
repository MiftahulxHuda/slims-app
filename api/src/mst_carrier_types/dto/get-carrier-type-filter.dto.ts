import { IsOptional, IsIn, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetCarrierTypeFilterDto {
  @IsOptional()
  carrier_type: string;

  @IsOptional()
  sort: string;
}