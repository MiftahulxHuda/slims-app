import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CustomDate } from 'src/utils/custom-date';

export class UpdateMSTGMDDto {
    @ApiProperty()
    @IsNotEmpty()
    gmd_code: string;

    @ApiProperty()
    @IsNotEmpty()
    gmd_name: string;

    last_update: string = new CustomDate().getDate();
}