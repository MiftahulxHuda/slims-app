import { EntityRepository, Repository, Like } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { MST_Topic } from './mst_topic.entity';

@EntityRepository(MST_Topic)
export class MSTTopicRepository extends Repository<MST_Topic> {
}