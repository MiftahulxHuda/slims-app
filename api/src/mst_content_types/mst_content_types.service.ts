import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { MSTContentTypeRepository } from './mst_content_type.repository';
import { MST_Content_Type } from './mst_content_type.entity';
import { DbGenService } from 'src/utils/DbGenService';

@Injectable()
export class MSTContentTypesService extends DbGenService<MST_Content_Type>  {
    constructor(
        @InjectRepository(MSTContentTypeRepository)
        private MSTContentTypeRepository: MSTContentTypeRepository,
    ) {
        super(MSTContentTypeRepository);
    }

    async createMSTContentType(createMSTContentTypeDto): Promise<any> {
        const findMSTContentTypeByContentType = await this.findOne({ content_type: createMSTContentTypeDto.content_type });
        if (findMSTContentTypeByContentType) {
            throw new BadRequestException('Content Type is exist');
        }

        return await this.create(createMSTContentTypeDto);
    }

    async updateMSTContentTypeById(id, updateMSTContentTypeDto): Promise<any> {
        const findMSTContentTypeById = await this.findOne({ id: id });
        if (findMSTContentTypeById) {
            if (findMSTContentTypeById.content_type != updateMSTContentTypeDto.content_type) {
                const findMSTContentTypeByContentType = await this.findOne({ content_type: updateMSTContentTypeDto.content_type });
                if (findMSTContentTypeByContentType) {
                    throw new BadRequestException('Content Type is exist');
                }
            }
        }

        return await this.updateOne({ id }, updateMSTContentTypeDto);
    }

}