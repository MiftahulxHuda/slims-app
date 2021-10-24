import { IsOptional, IsIn, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetFrequencyFilterDto {
  @IsOptional()
  frequency: string;

  @IsOptional()
  sort: string;
}