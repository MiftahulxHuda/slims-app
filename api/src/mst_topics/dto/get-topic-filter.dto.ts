import { IsOptional, IsIn, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetTopicFilterDto {
  @IsOptional()
  topic: string;

  @IsOptional()
  sort: string;
}