import { EntityRepository, Repository, Like } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { MST_Place } from './mst_place.entity';

@EntityRepository(MST_Place)
export class MSTPlaceRepository extends Repository<MST_Place> {
}