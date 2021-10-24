import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBiblioTopicDto {
    @ApiProperty()
    @IsNotEmpty()
    biblio_id: number;

    @ApiProperty()
    @IsNotEmpty()
    topic_id: number;

    @ApiProperty()
    @IsNotEmpty()
    level: number;
}

export class CreateBiblioTopicByBiblioIdDto {
    @ApiProperty()
    @IsNotEmpty()
    topic_id: number;

    @ApiProperty()
    @IsNotEmpty()
    level: number;
}