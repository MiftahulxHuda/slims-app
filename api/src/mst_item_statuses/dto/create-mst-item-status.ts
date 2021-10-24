import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CustomDate } from 'src/utils/custom-date';

export class CreateMSTItemStatusDto {
    @ApiProperty()
    @IsNotEmpty()
    item_status_id: string;
    
    @ApiProperty()
    @IsNotEmpty()
    item_status_name: string;

    @ApiProperty()
    @IsNotEmpty()
    no_loan: number;

    @ApiProperty()
    @IsNotEmpty()
    skip_stock_take: number;
    
    input_date: string = new CustomDate().getDate();

    last_update: string = new CustomDate().getDate();
}