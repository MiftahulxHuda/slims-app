import { EntityRepository, Repository, Like } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { MST_GMD } from './mst_gmd.entity';

@EntityRepository(MST_GMD)
export class MSTGMDRepository extends Repository<MST_GMD> {
}