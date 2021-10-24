import { EntityRepository, Repository, Like } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { MST_Coll_Type } from './mst_coll_type.entity';

@EntityRepository(MST_Coll_Type)
export class MSTCollTypeRepository extends Repository<MST_Coll_Type> {
}