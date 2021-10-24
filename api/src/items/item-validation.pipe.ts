import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

import { CustomDate } from 'src/utils/custom-date';

@Injectable()
export class ItemValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if(Array.isArray(value) && metadata.type === 'body') {
            return value.map((val) => { 
                let date_time = new CustomDate().getDateTime();
                val.input_date = date_time;
                val.last_update = date_time;
                val.uid = 1;
                return val;
            })
        }
        
        throw new BadRequestException('Validation failed');
    }
}