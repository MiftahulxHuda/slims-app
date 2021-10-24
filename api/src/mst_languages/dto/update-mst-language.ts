import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CustomDate } from 'src/utils/custom-date';

export class UpdateMSTLanguageDto {
    @ApiProperty()
    @IsNotEmpty()
    language_id: string;
    
    @ApiProperty()
    @IsNotEmpty()
    language_name: string;

    last_update: string = new CustomDate().getDate();
}