import { IsOptional, IsIn, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetMediaTypeFilterDto {
  @IsOptional()
  media_type: string;

  @IsOptional()
  sort: string;
}