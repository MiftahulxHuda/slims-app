import { IsOptional, IsIn, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetPublisherFilterDto {
  @IsOptional()
  publisher_name: string;

  @IsOptional()
  sort: string;
}