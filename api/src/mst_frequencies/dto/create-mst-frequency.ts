import { IsIn, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CustomDate } from 'src/utils/custom-date';
import { TimeUnit } from '../mst_frequency.entity';

export class CreateMSTFrequencyDto {
    @ApiProperty()
    @IsNotEmpty()
    frequency: string;

    @ApiProperty()
    @IsNotEmpty()
    language_prefix: string;

    @ApiProperty()
    @IsNotEmpty()
    time_increment: string;

    @ApiProperty({ enum: ['day', 'week', 'month', 'year'] })
    @IsIn([TimeUnit.DAY, TimeUnit.MONTH, TimeUnit.WEEK, TimeUnit.YEAR])
    time_unit: TimeUnit;
    
    input_date: string = new CustomDate().getDate();

    last_update: string = new CustomDate().getDate();
}