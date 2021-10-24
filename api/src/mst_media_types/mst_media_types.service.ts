import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { MSTMediaTypeRepository } from './mst_media_type.repository';
import { MST_Media_Type } from './mst_media_type.entity';
import { DbGenService } from 'src/utils/DbGenService';

@Injectable()
export class MSTMediaTypesService extends DbGenService<MST_Media_Type>  {
    constructor(
        @InjectRepository(MSTMediaTypeRepository)
        private MSTMediaTypeRepository: MSTMediaTypeRepository,
    ) {
        super(MSTMediaTypeRepository);
    }

    async createMSTMediaType(createMSTMediaTypeDto): Promise<any> {
        const findMSTMediaTypeByContentType = await this.findOne({ media_type: createMSTMediaTypeDto.media_type });
        if (findMSTMediaTypeByContentType) {
            throw new BadRequestException('Media Type is exist');
        }

        return await this.create(createMSTMediaTypeDto);
    }

    async updateMSTMediaTypeById(id, updateMSTMediaTypeDto): Promise<any> {
        const findMSTMediaTypeById = await this.findOne({ id: id });
        if (findMSTMediaTypeById) {
            if (findMSTMediaTypeById.media_type != updateMSTMediaTypeDto.media_type) {
                const findMSTMediaTypeByMediaType = await this.findOne({ media_type: updateMSTMediaTypeDto.media_type });
                if (findMSTMediaTypeByMediaType) {
                    throw new BadRequestException('Media Type is exist');
                }
            }
        }

        return await this.updateOne({ id }, updateMSTMediaTypeDto);
    }
}