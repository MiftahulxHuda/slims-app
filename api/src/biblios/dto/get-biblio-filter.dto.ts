import { IsOptional, IsIn, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetBiblioFilterDto {
  @IsOptional()
  title: string;

  @IsOptional()
  author: string;

  @IsOptional()
  isbn_issn: string;

  @IsOptional()
  publisher: string;

  @IsOptional()
  sort: string;
}