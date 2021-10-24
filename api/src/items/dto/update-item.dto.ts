import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { CustomDate } from 'src/utils/custom-date';
import { Source } from '../source.enum';

export class UpdateItemDto {
    @ApiProperty()
    biblio_id: number;

    @ApiProperty({ default: null })
    call_number: string;

    @ApiProperty({ default: null })
    coll_type_id: number;

    @ApiProperty({ default: null })
    @IsNotEmpty()
    item_code: string;

    @ApiProperty({ default: null })
    inventory_code: string;

    @ApiProperty({ default: null })
    received_date: string;

    @ApiProperty({ default: null })
    supplier_id: string;

    @ApiProperty({ default: null })
    order_no: string;

    @ApiProperty({ default: null })
    location_id: string;

    @ApiProperty({ default: null })
    order_date: string;

    @ApiProperty({ default: null })
    item_status_id: string;

    @ApiProperty({ default: null })
    site: string;

    @ApiProperty({ default: Source.BUY })
    source: number;

    @ApiProperty({ default: null })
    invoice: string;

    @ApiProperty({ default: null })
    price: number;

    @ApiProperty({ default: null })
    price_currency: string;

    @ApiProperty({ default: null })
    invoice_date: string;

    last_update: string = new CustomDate().getDateTime();

    // uid: number;
}