import { EntityRepository, Repository, Like } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { MST_Supplier } from './mst_supplier.entity';

@EntityRepository(MST_Supplier)
export class MSTSupplierRepository extends Repository<MST_Supplier> {
}