import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CustomDate } from 'src/utils/custom-date';

export class UpdateMSTCollTypeDto {
    @ApiProperty()
    @IsNotEmpty()
    coll_type_name: string;

    last_update: string = new CustomDate().getDateTime();
}