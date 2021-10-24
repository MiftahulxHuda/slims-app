import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { MSTTopicRepository } from './mst_topic.repository';
import { MST_Topic } from './mst_topic.entity';
import { DbGenService } from 'src/utils/DbGenService';

@Injectable()
export class MSTTopicsService extends DbGenService<MST_Topic>  {
    constructor(
        @InjectRepository(MSTTopicRepository)
        private MSTTopicRepository: MSTTopicRepository,
    ) {
        super(MSTTopicRepository);
    }

    async createMSTTopic(createMSTTopicDto): Promise<any> {
        const findMSTTopicByTopic = await this.findOne({ topic: createMSTTopicDto.topic });
        if (findMSTTopicByTopic) {
            throw new BadRequestException('Topic is exist');
        }

        return await this.create(createMSTTopicDto);
    }

    async updateMSTTopicByTopicId(topic_id, updateMSTTopicDto): Promise<any> {
        const findMSTTopicByTopicId = await this.findOne({ topic_id: topic_id });
        if (findMSTTopicByTopicId) {
            if (findMSTTopicByTopicId.topic != updateMSTTopicDto.topic) {
                const findMSTTopicByTopic = await this.findOne({ topic: updateMSTTopicDto.topic });
                if (findMSTTopicByTopic) {
                    throw new BadRequestException('Topic is exist');
                }
            }
        }

        return await this.updateOne({ topic_id }, updateMSTTopicDto);
    }
}