import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CustomDate } from 'src/utils/custom-date';

export class UpdateMSTCarrierTypeDto {
    @ApiProperty()
    @IsNotEmpty()
    code: string;

    @ApiProperty()
    @IsNotEmpty()
    code2: string;

    @ApiProperty()
    @IsNotEmpty()
    carrier_type: string;

    last_update: string = new CustomDate().getDateTime();
}