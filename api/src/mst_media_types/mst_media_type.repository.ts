import { EntityRepository, Repository, Like } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { MST_Media_Type } from './mst_media_type.entity';

@EntityRepository(MST_Media_Type)
export class MSTMediaTypeRepository extends Repository<MST_Media_Type> {
}