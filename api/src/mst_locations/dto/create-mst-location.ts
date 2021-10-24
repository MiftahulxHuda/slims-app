import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CustomDate } from 'src/utils/custom-date';

export class CreateMSTLocationDto {
    @ApiProperty()
    @IsNotEmpty()
    location_id: string;

    @ApiProperty()
    @IsNotEmpty()
    location_name: string;

    input_date: string = new CustomDate().getDate();

    last_update: string = new CustomDate().getDate();
}