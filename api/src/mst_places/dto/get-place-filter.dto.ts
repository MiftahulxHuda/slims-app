import { IsOptional, IsIn, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetPlaceFilterDto {
  @IsOptional()
  place_name: string;

  @IsOptional()
  sort: string;
}