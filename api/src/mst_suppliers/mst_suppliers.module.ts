import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { MSTSupplierRepository } from './mst_supplier.repository';
import { MSTSuppliersController } from './mst_suppliers.controller';
import { MSTSuppliersService } from './mst_suppliers.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([MSTSupplierRepository]),
        AuthModule
    ],
    controllers: [MSTSuppliersController],
    providers: [MSTSuppliersService],
})
export class MSTSuppliersModule { }
