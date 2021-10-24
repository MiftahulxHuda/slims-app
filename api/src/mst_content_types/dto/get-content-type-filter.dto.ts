import { IsOptional, IsIn, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetContentTypeFilterDto {
  @IsOptional()
  content_type: string;

  @IsOptional()
  sort: string;
}