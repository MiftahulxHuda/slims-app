import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CustomDate } from 'src/utils/custom-date';

export class UpdateBiblioDto {
    @ApiProperty({ required: false, default: null })
    gmd_id: number;

    @ApiProperty()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ required: false, default: null })
    sor: string;

    @ApiProperty({ required: false, default: null })
    edition: string;

    @ApiProperty({ required: false, default: null })
    isbn_issn: string;

    @ApiProperty({ required: false, default: null })
    publisher_id: number;

    @ApiProperty({ required: false, default: null })
    publish_year: string;

    @ApiProperty({ required: false, default: null })
    collation: string;

    @ApiProperty({ required: false, default: null })
    series_title: string;

    @ApiProperty({ required: false, default: null })
    call_number: string;

    @ApiProperty({ required: false, default: 'en' })
    language_id: string;

    @ApiProperty({ required: false, default: null })
    source: string;

    @ApiProperty({ required: false, default: null })
    publish_place_id: number;

    @ApiProperty({ required: false, default: null })
    classification: string;

    @ApiProperty({ required: false, default: null })
    notes: string;

    // @ApiProperty({ type: 'string', format: 'binary', required: false, default: null })
    // image: string;

    @ApiProperty({ required: false, default: null })
    file_att: string;

    @ApiProperty({ required: false, default: 0 })
    opac_hide: number;

    @ApiProperty({ required: false, default: 0 })
    promoted: number;

    @ApiProperty({ required: false, default: 0 })
    frequency_id: number;

    @ApiProperty({ required: false, default: null })
    spec_detail_info: string;

    @ApiProperty({ required: false, default: null })
    content_type_id: number;

    @ApiProperty({ required: false, default: null })
    media_type_id: number;
    
    @ApiProperty({ required: false, default: null })
    carrier_type_id: number;

    last_update: string = new CustomDate().getDateTime();

    // uid: number = 1;

    author: Object[];

    topic: Object[];

    attachment: Object[];
}