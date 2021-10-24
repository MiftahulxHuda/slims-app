import { EntityRepository, Repository, Like } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { MST_Location } from './mst_location.entity';

@EntityRepository(MST_Location)
export class MSTLocationRepository extends Repository<MST_Location> {
}