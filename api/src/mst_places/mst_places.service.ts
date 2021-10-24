import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DbGenService } from 'src/utils/DbGenService';
import { MST_Place } from './mst_place.entity';
import { MSTPlaceRepository } from './mst_place.repository';

@Injectable()
export class MSTPlacesService extends DbGenService<MST_Place>  {
    constructor(
        @InjectRepository(MSTPlaceRepository)
        private MSTPlaceRepository: MSTPlaceRepository,
    ) {
        super(MSTPlaceRepository);
    }

    async createMSTPlace(createMSTPlaceDto): Promise<any> {
        const findMSTPlaceByPlace = await this.findOne({ place_name: createMSTPlaceDto.place_name });
        if (findMSTPlaceByPlace) {
            throw new BadRequestException('Place is exist');
        }

        return await this.create(createMSTPlaceDto);
    }

    async updateMSTPlaceById(place_id, updateMSTPlaceDto): Promise<any> {
        const findMSTPlaceByPlaceId = await this.findOne({ place_id: place_id });
        if (findMSTPlaceByPlaceId) {
            if (findMSTPlaceByPlaceId.place_name != updateMSTPlaceDto.place_name) {
                const findMSTPlaceByPlace = await this.findOne({ place_name: updateMSTPlaceDto.place_name });
                if (findMSTPlaceByPlace) {
                    throw new BadRequestException('Place is exist');
                }
            }
        }

        return await this.updateOne({ place_id }, updateMSTPlaceDto);
    }
}