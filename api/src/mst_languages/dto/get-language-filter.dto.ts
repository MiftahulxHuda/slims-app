import { IsOptional, IsIn, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetLanguageFilterDto {
  @IsOptional()
  language_name: string;

  @IsOptional()
  sort: string;
}