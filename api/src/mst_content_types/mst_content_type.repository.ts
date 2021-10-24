import { EntityRepository, Repository, Like } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { MST_Content_Type } from './mst_content_type.entity';

@EntityRepository(MST_Content_Type)
export class MSTContentTypeRepository extends Repository<MST_Content_Type> {
}