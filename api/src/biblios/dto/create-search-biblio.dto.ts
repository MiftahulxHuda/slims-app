import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AccessType, Placement } from 'src/biblio_attachments/biblio_attachment.entity';

export class CreateSearchBiblioDto {
  @ApiProperty()
  author: string;

  @ApiProperty()
  topic: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  collection_types: string;

  @ApiProperty()
  items: string;
}