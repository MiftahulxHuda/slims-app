import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { MSTFrequencyRepository } from './mst_frequency.repository';
import { MST_Frequency } from './mst_frequency.entity';
import { DbGenService } from 'src/utils/DbGenService';

@Injectable()
export class MSTFrequenciesService extends DbGenService<MST_Frequency>  {
    constructor(
        @InjectRepository(MSTFrequencyRepository)
        private MSTFrequencyRepository: MSTFrequencyRepository,
    ) {
        super(MSTFrequencyRepository);
    }

    async getFrequencies(filter, sort, pagination): Promise<any> {
        return await this.MSTFrequencyRepository.getFrequencies(filter, sort, pagination);
    }

    async createMSTFrequency(createMSTFrequencyDto): Promise<any> {
        const findMSTFrequencyByFrequency = await this.findOne({ frequency: createMSTFrequencyDto.frequency });
        if (findMSTFrequencyByFrequency) {
            throw new BadRequestException('Frequency is exist');
        }

        return await this.create(createMSTFrequencyDto);
    }

    async updateMSTFrequencyByFrequencyId(frequency_id, updateMSTFrequencyDto): Promise<any> {
        const findMSTFrequencyByFrequencyId = await this.findOne({ frequency_id: frequency_id });
        if (findMSTFrequencyByFrequencyId) {
            if (findMSTFrequencyByFrequencyId.frequency != updateMSTFrequencyDto.frequency) {
                const findMSTFrequencyByFrequency = await this.findOne({ frequency: updateMSTFrequencyDto.frequency });
                if (findMSTFrequencyByFrequency) {
                    throw new BadRequestException('Frequency is exist');
                }
            }
        }

        return await this.updateOne({ frequency_id }, updateMSTFrequencyDto);
    }
}