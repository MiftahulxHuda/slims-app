import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { MSTGMDRepository } from './mst_gmd.repository';
import { MST_GMD } from './mst_gmd.entity';
import { DbGenService } from 'src/utils/DbGenService';

@Injectable()
export class MSTGMDsService extends DbGenService<MST_GMD>  {
    constructor(
        @InjectRepository(MSTGMDRepository)
        private MSTGMDRepository: MSTGMDRepository,
    ) {
        super(MSTGMDRepository);
    }

    async createMSTGMD(createMSTGMDDto): Promise<any> {
        const findGMDByGMDCode = await this.findOne({ gmd_code: createMSTGMDDto.gmd_code });
        if (findGMDByGMDCode) {
            throw new BadRequestException('GMD Code is exist');
        }

        return await this.create(createMSTGMDDto);
    }

    async updateMSTGMDByGMDId(gmd_id, updateMSTGMDDto): Promise<any> {
        const findGMDByGMDId = await this.findOne({ gmd_id: gmd_id });
        if (findGMDByGMDId) {
            if (findGMDByGMDId.gmd_code != updateMSTGMDDto.gmd_code) {
                const findGMDByGMDCode = await this.findOne({ gmd_code: updateMSTGMDDto.gmd_code });
                if (findGMDByGMDCode) {
                    throw new BadRequestException('GMD Code is exist');
                }
            }
        }

        return await this.updateOne({ gmd_id: gmd_id }, updateMSTGMDDto);
    }
}