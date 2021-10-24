import { IsOptional, IsIn, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetFileFilterDto {
  @IsOptional()
  file_title: string;

  @IsOptional()
  sort: string;
}