import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { CustomDate } from 'src/utils/custom-date';

export class UpdateFileDto {
    @ApiProperty()
    @IsNotEmpty()
    file_title: string;

    @ApiProperty({ required: false })
    file_url: string;

    @ApiProperty({ required: false })
    file_desc: string;

    // @ApiProperty({ required: false })
    // uploader_id: number = 1;

    last_update: string = new CustomDate().getDateTime();
}