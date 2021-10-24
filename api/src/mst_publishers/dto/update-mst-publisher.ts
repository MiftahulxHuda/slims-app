import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CustomDate } from 'src/utils/custom-date';

export class UpdateMSTPublisherDto {
    @ApiProperty()
    @IsNotEmpty()
    publisher_name: string;

    last_update: string = new CustomDate().getDate();
}