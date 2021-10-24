import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { MSTSupplierRepository } from './mst_supplier.repository';
import { MST_Supplier } from './mst_supplier.entity';
import { DbGenService } from 'src/utils/DbGenService';

@Injectable()
export class MSTSuppliersService extends DbGenService<MST_Supplier>  {
    constructor(
        @InjectRepository(MSTSupplierRepository)
        private MSTSupplierRepository: MSTSupplierRepository,
    ) {
        super(MSTSupplierRepository);
    }

    async createMSTSupplier(createMSTSupplierDto): Promise<any> {
        const findMSTSupplierBySupplierName = await this.findOne({ supplier_name: createMSTSupplierDto.supplier_name });
        if (findMSTSupplierBySupplierName) {
            throw new BadRequestException('Supplier is exist');
        }

        return await this.create(createMSTSupplierDto);
    }

    async updateMSTSupplierBySupplierId(supplier_id, updateMSTSupplierDto): Promise<any> {
        const findMSTSupplierBySupplierId = await this.findOne({ supplier_id: supplier_id });
        if (findMSTSupplierBySupplierId) {
            if (findMSTSupplierBySupplierId.supplier_name != updateMSTSupplierDto.supplier_name) {
                const findMSTSupplierBySupplierName = await this.findOne({ supplier_name: updateMSTSupplierDto.supplier_name });
                if (findMSTSupplierBySupplierName) {
                    throw new BadRequestException('Supplier is exist');
                }
            }
        }

        return await this.updateOne({ supplier_id }, updateMSTSupplierDto);
    }
}