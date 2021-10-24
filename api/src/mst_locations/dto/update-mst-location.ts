import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CustomDate } from 'src/utils/custom-date';

export class UpdateMSTLocationDto {
    @ApiProperty()
    @IsNotEmpty()
    location_id: string;

    @ApiProperty()
    @IsNotEmpty()
    location_name: string;

    last_update: string = new CustomDate().getDate();
}