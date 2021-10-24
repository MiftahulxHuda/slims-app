import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { CustomDate } from 'src/utils/custom-date';

export class UploadCoverDTO {
    @ApiProperty({ type: 'string', format: 'binary', required: false })
    image: string;
}