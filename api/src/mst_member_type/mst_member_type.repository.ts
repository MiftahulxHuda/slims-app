import { EntityRepository, Repository, Like } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { MST_Member_Type } from './mst_member_type.entity';

@EntityRepository(MST_Member_Type)
export class MSTMemberTypeRepository extends Repository<MST_Member_Type> {
}