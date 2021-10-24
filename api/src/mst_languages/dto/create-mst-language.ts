import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CustomDate } from 'src/utils/custom-date';

export class CreateMSTLanguageDto {
    @ApiProperty()
    @IsNotEmpty()
    language_id: string;
    
    @ApiProperty()
    @IsNotEmpty()
    language_name: string;

    input_date: string = new CustomDate().getDate();

    last_update: string = new CustomDate().getDate();
}