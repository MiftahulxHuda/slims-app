import { IsOptional, IsIn, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetGMDFilterDto {
  @IsOptional()
  gmd_name: string;

  @IsOptional()
  sort: string;
}