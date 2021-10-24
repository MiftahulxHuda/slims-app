import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { MSTCarrierTypeRepository } from './mst_carrier_type.repository';
import { MST_Carrier_Type } from './mst_carrier_type.entity';
import { DbGenService } from 'src/utils/DbGenService';

@Injectable()
export class MSTCarrierTypesService extends DbGenService<MST_Carrier_Type>  {
    constructor(
        @InjectRepository(MSTCarrierTypeRepository)
        private MSTCarrierTypeRepository: MSTCarrierTypeRepository,
    ) {
        super(MSTCarrierTypeRepository);
    }

    async createMSTCarrierType(createMSTCarrierTypeDto): Promise<any> {
        const findMSTCarrierTypeByContentType = await this.findOne({ carrier_type: createMSTCarrierTypeDto.carrier_type });
        if (findMSTCarrierTypeByContentType) {
            throw new BadRequestException('Carrier Type is exist');
        }

        return await this.create(createMSTCarrierTypeDto);
    }

    async updateMSTCarrierTypeById(id, updateMSTCarrierTypeDto): Promise<any> {
        const findMSTCarrierTypeById = await this.findOne({ id: id });
        if (findMSTCarrierTypeById) {
            if (findMSTCarrierTypeById.carrier_type != updateMSTCarrierTypeDto.carrier_type) {
                const findMSTCarrierTypeByCarrierType = await this.findOne({ carrier_type: updateMSTCarrierTypeDto.carrier_type });
                if (findMSTCarrierTypeByCarrierType) {
                    throw new BadRequestException('Carrier Type is exist');
                }
            }
        }

        return await this.updateOne({ id }, updateMSTCarrierTypeDto);
    }
}