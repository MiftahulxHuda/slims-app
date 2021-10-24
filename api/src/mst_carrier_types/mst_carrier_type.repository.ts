import { EntityRepository, Repository, Like } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { MST_Carrier_Type } from './mst_carrier_type.entity';

@EntityRepository(MST_Carrier_Type)
export class MSTCarrierTypeRepository extends Repository<MST_Carrier_Type> {
}