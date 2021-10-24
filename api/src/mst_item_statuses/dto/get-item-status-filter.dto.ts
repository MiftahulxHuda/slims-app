import { IsOptional, IsIn, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetItemStatusFilterDto {
  @IsOptional()
  item_status_name: string;

  @IsOptional()
  sort: string;
}