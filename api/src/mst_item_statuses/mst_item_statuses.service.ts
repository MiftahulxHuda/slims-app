import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { MSTItemStatusRepository } from './mst_item_status.repository';
import { MST_Item_Status } from './mst_item_status.entity';
import { DbGenService } from 'src/utils/DbGenService';

@Injectable()
export class MSTItemStatusesService extends DbGenService<MST_Item_Status>  {
    constructor(
        @InjectRepository(MSTItemStatusRepository)
        private MSTItemStatusRepository: MSTItemStatusRepository,
    ) {
        super(MSTItemStatusRepository);
    }

    async createMSTItemStatus(createMSTItemStatusDto): Promise<any> {
        const findMSTItemStatusByItemStatusId = await this.findOne({ item_status_id: createMSTItemStatusDto.item_status_id });
        if (findMSTItemStatusByItemStatusId) {
            throw new BadRequestException('Item Status is exist');
        }
        
        const findMSTItemStatusByItemStatus = await this.findOne({ item_status_name: createMSTItemStatusDto.item_status_name });
        if (findMSTItemStatusByItemStatus) {
            throw new BadRequestException('Item Status is exist');
        }

        return await this.create(createMSTItemStatusDto);
    }

    async updateMSTItemStatusByItemStatusId(item_status_id, updateMSTItemStatusDto): Promise<any> {
        const findMSTItemStatusByItemStatusId = await this.findOne({ item_status_id: item_status_id });
        if (findMSTItemStatusByItemStatusId) {
            if (findMSTItemStatusByItemStatusId.item_status_id != updateMSTItemStatusDto.item_status_id) {
                const findMSTItemStatusByItemStatusId = await this.findOne({ item_status_id: updateMSTItemStatusDto.item_status_id });
                if (findMSTItemStatusByItemStatusId) {
                    throw new BadRequestException('Item Status is exist');
                }
            }
            
            if (findMSTItemStatusByItemStatusId.item_status_name != updateMSTItemStatusDto.item_status_name) {
                const findMSTItemStatusByItemStatus = await this.findOne({ item_status_name: updateMSTItemStatusDto.item_status_name });
                if (findMSTItemStatusByItemStatus) {
                    throw new BadRequestException('Item Status is exist');
                }
            }
        }

        return await this.updateOne({ item_status_id }, updateMSTItemStatusDto);
    }
}