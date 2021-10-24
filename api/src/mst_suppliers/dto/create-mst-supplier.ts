import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CustomDate } from 'src/utils/custom-date';

export class CreateMSTSupplierDto {
    @ApiProperty()
    @IsNotEmpty()
    supplier_name: string;

    @ApiProperty()
    address: string;

    // @ApiProperty()
    // postal_code: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    contact: string;

    @ApiProperty()
    fax: string;

    @ApiProperty()
    account: string;

    // @ApiProperty()
    // e_mail: string;
    
    input_date: string = new CustomDate().getDate();

    last_update: string = new CustomDate().getDate();
}