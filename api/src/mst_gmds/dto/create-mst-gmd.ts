import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CustomDate } from 'src/utils/custom-date';

export class CreateMSTGMDDto {
    // ditambahin validasi maksimal 3
    @ApiProperty()
    @IsNotEmpty()
    gmd_code: string;

    @ApiProperty()
    @IsNotEmpty()
    gmd_name: string;

    input_date: string = new CustomDate().getDate();

    last_update: string = new CustomDate().getDate();
}