import { IsOptional, IsIn, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetAuthorFilterDto {
  @IsOptional()
  author_name: string;

  @IsOptional()
  sort: string;
}