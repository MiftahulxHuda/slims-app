import { EntityRepository, Repository, Like } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { MST_Item_Status } from './mst_item_status.entity';

@EntityRepository(MST_Item_Status)
export class MSTItemStatusRepository extends Repository<MST_Item_Status> {
}