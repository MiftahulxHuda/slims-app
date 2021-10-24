import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AccessType, Placement } from 'src/biblio_attachments/biblio_attachment.entity';

export class CreateBiblioAttachmentDto {
    @ApiProperty()
    @IsNotEmpty()
    biblio_id: number;

    @ApiProperty()
    @IsNotEmpty()
    file_id: number;

    @ApiProperty({ enum: ['link', 'popup', 'embed'] })
    placement: Placement;

    @ApiProperty({ enum: ['public', 'private'] })
    access_type: AccessType;

    @ApiProperty()
    access_limit: string;
}

export class CreateBiblioAttachmentByBiblioIdDto {
    @ApiProperty()
    @IsNotEmpty()
    file_id: number;

    @ApiProperty({ enum: ['link', 'popup', 'embed'] })
    placement: Placement;

    @ApiProperty({ enum: ['public', 'private'] })
    access_type: AccessType;

    @ApiProperty()
    access_limit: string;
}