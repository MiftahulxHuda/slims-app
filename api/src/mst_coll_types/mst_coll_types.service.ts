import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { MSTCollTypeRepository } from './mst_coll_type.repository';
import { MST_Coll_Type } from './mst_coll_type.entity';
import { DbGenService } from 'src/utils/DbGenService';

@Injectable()
export class MSTCollTypesService extends DbGenService<MST_Coll_Type>  {
    constructor(
        @InjectRepository(MSTCollTypeRepository)
        private MSTCollTypeRepository: MSTCollTypeRepository,
    ) {
        super(MSTCollTypeRepository);
    }

    async createMSTCollType(createMSTCollTypeDto): Promise<any> {
        const findMSTCollTypeByCollType = await this.findOne({ coll_type_name: createMSTCollTypeDto.coll_type_name });
        if (findMSTCollTypeByCollType) {
            throw new BadRequestException('Coll Type is exist');
        }

        return await this.create(createMSTCollTypeDto);
    }

    async updateMSTCollTypeById(coll_type_id, updateMSTCollTypeDto): Promise<any> {
        const findMSTCollTypeByCollTypeId = await this.findOne({ coll_type_id: coll_type_id });
        if (findMSTCollTypeByCollTypeId) {
            if (findMSTCollTypeByCollTypeId.coll_type_name != updateMSTCollTypeDto.coll_type_name) {
                const findMSTCollTypeByCollType = await this.findOne({ coll_type_name: updateMSTCollTypeDto.coll_type_name });
                if (findMSTCollTypeByCollType) {
                    throw new BadRequestException('Coll Type is exist');
                }
            }
        }

        return await this.updateOne({ coll_type_id }, updateMSTCollTypeDto);
    }
}