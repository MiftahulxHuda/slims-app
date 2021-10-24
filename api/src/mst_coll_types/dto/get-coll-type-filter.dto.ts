import { IsOptional, IsIn, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetCollTypeFilterDto {
  @IsOptional()
  coll_type_name: string;

  @IsOptional()
  sort: string;
}