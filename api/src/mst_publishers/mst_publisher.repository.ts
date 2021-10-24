import { EntityRepository, Repository, Like } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { MST_Publisher } from './mst-publisher.entity';

@EntityRepository(MST_Publisher)
export class MSTPublisherRepository extends Repository<MST_Publisher> {
}