import { IsOptional, IsIn, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetLocationFilterDto {
  @IsOptional()
  location_name: string;

  @IsOptional()
  sort: string;
}