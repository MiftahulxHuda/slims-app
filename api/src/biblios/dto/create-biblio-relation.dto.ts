import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBiblioRelationDto {
    @ApiProperty()
    @IsNotEmpty()
    biblio_id: number;

    @ApiProperty()
    @IsNotEmpty()
    rel_biblio_id: number;

    @ApiProperty({ default: 1 })
    @IsNotEmpty()
    rel_type: number = 1;
}

export class CreateBiblioRelationByBiblioIdDto {
    @ApiProperty()
    @IsNotEmpty()
    rel_biblio_id: number;

    @ApiProperty({ default: 1 })
    @IsNotEmpty()
    rel_type: number = 1;
}