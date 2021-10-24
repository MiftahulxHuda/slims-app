import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { MSTPublisherRepository } from './mst_publisher.repository';
import { MST_Publisher } from './mst-publisher.entity';
import { DbGenService } from 'src/utils/DbGenService';

@Injectable()
export class MSTPublishersService extends DbGenService<MST_Publisher>  {
    constructor(
        @InjectRepository(MSTPublisherRepository)
        private MSTPublisherRepository: MSTPublisherRepository,
    ) {
        super(MSTPublisherRepository);
    }

    async createMSTPublisher(createMSTPublisherDto): Promise<any> {
        const findMSTPublisherByPublisherName = await this.findOne({ publisher_name: createMSTPublisherDto.publisher_name });
        if (findMSTPublisherByPublisherName) {
            throw new BadRequestException('Publisher is exist');
        }

        return await this.create(createMSTPublisherDto);
    }

    async updateMSTPublisherByPublisherId(publisher_id, updateMSTPublisherDto): Promise<any> {
        const findMSTPublisherByPublisherId = await this.findOne({ publisher_id: publisher_id });
        if (findMSTPublisherByPublisherId) {
            if (findMSTPublisherByPublisherId.publisher_name != updateMSTPublisherDto.publisher_name) {
                const findMSTPublisherByPublisherName = await this.findOne({ publisher_name: updateMSTPublisherDto.publisher_name });
                if (findMSTPublisherByPublisherName) {
                    throw new BadRequestException('Publisher is exist');
                }
            }
        }

        return await this.updateOne({ publisher_id }, updateMSTPublisherDto);
    }
}