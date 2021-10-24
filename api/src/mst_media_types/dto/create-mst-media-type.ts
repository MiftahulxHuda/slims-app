import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CustomDate } from 'src/utils/custom-date';

export class CreateMSTMediaTypeDto {
    @ApiProperty()
    @IsNotEmpty()
    code: string;

    @ApiProperty()
    code2: string;

    @ApiProperty()
    @IsNotEmpty()
    media_type: string;

    input_date: string = new CustomDate().getDateTime();

    last_update: string = new CustomDate().getDateTime();
}