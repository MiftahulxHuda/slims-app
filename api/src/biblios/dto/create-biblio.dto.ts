import { IsIn, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CustomDate } from 'src/utils/custom-date';
import { AccessType } from 'src/biblio_attachments/biblio_attachment.entity';

class Author {
    @ApiProperty()
    @IsNotEmpty()
    author_id: number;

    @ApiProperty()
    @IsNotEmpty()
    author_name: string;

    @ApiProperty({ default: 1 })
    @IsNotEmpty()
    level: number;
}

class Topic {
    @ApiProperty()
    @IsNotEmpty()
    topic_id: number;

    @ApiProperty()
    @IsNotEmpty()
    topic_name: string;

    @ApiProperty({ default: 1 })
    @IsNotEmpty()
    level: number;
}

class Attachment {
    @ApiProperty({ required: false, default: false })
    access_limit: boolean;

    @ApiProperty({ enum: ['public', 'private'] })
    @IsIn([AccessType.PUBLIC, AccessType.PRIVATE])
    @IsNotEmpty()
    access_type: string;

    @ApiProperty()
    file_desc: string;

    @ApiProperty()
    @IsNotEmpty()
    file_id: number;

    @ApiProperty()
    @IsNotEmpty()
    file_title: string;

    @ApiProperty()
    @IsNotEmpty()
    placement: number;
}

class RelationBiblio {
    @ApiProperty()
    @IsNotEmpty()
    rel_biblio_id: number;
}

export class CreateBiblioDto {
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

    // @ApiProperty({ required: false, default: null })
    // labels: string;

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

    input_date: string = new CustomDate().getDateTime();

    last_update: string = new CustomDate().getDateTime();

    // uid: number = 1;

    // @ApiProperty({ type: [Author] })
    // author: Author[];

    // @ApiProperty({ type: [Topic] })
    // @IsNotEmpty()
    // topic: Topic[];

    // @ApiProperty({ type: [Attachment] })
    // attachment: Attachment[];

    // @ApiProperty({ type: [RelationBiblio] })
    // relation: RelationBiblio[];
}