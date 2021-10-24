import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CustomDate } from 'src/utils/custom-date';

export class UpdateMSTContentTypeDto {
    @ApiProperty()
    @IsNotEmpty()
    code: string;

    @ApiProperty()
    @IsNotEmpty()
    code2: string;

    @ApiProperty()
    @IsNotEmpty()
    content_type: string;

    last_update: string = new CustomDate().getDateTime();
}