import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBiblioAuthorDto {
    @ApiProperty()
    @IsNotEmpty()
    biblio_id: number;

    @ApiProperty()
    @IsNotEmpty()
    author_id: number;

    @ApiProperty()
    @IsNotEmpty()
    level: number;
}

export class CreateBiblioAuthorByBiblioIdDto {
    @ApiProperty()
    @IsNotEmpty()
    author_id: number;

    @ApiProperty()
    @IsNotEmpty()
    level: number;
}