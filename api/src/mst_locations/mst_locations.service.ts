import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { MSTLocationRepository } from './mst_location.repository';
import { MST_Location } from './mst_location.entity';
import { DbGenService } from 'src/utils/DbGenService';

@Injectable()
export class MSTLocationsService extends DbGenService<MST_Location>  {
    constructor(
        @InjectRepository(MSTLocationRepository)
        private MSTLocationRepository: MSTLocationRepository,
    ) {
        super(MSTLocationRepository);
    }

    async createMSTLocation(createMSTLocationDto): Promise<any> {
        const findMSTLocationByLocationId = await this.findOne({ location_id: createMSTLocationDto.location_id });
        if (findMSTLocationByLocationId) {
            throw new BadRequestException('Location is exist');
        }
        
        const findMSTLocationByLocation = await this.findOne({ location_name: createMSTLocationDto.location_name });
        if (findMSTLocationByLocation) {
            throw new BadRequestException('Location is exist');
        }

        return await this.create(createMSTLocationDto);
    }

    async updateMSTLocationByLocationId(location_id, updateMSTLocationDto): Promise<any> {
        const findMSTLocationByLocationId = await this.findOne({ location_id: location_id });
        if (findMSTLocationByLocationId) {
            if (findMSTLocationByLocationId.location_id != updateMSTLocationDto.location_id) {
                const findMSTLocationByLocationId = await this.findOne({ location_id: updateMSTLocationDto.location_id });
                if (findMSTLocationByLocationId) {
                    throw new BadRequestException('Location is exist');
                }
            }
            
            if (findMSTLocationByLocationId.location_name != updateMSTLocationDto.location_name) {
                const findMSTLocationByLocation = await this.findOne({ location_name: updateMSTLocationDto.location_name });
                if (findMSTLocationByLocation) {
                    throw new BadRequestException('Location is exist');
                }
            }
        }

        return await this.updateOne({ location_id }, updateMSTLocationDto);
    }
}