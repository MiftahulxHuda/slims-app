import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { MSTCarrierTypeRepository } from './mst_carrier_type.repository';
import { MSTCarrierTypesController } from './mst_carrier_types.controller';
import { MSTCarrierTypesService } from './mst_carrier_types.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([MSTCarrierTypeRepository]),
        AuthModule
    ],
    controllers: [MSTCarrierTypesController],
    providers: [MSTCarrierTypesService],
})
export class MSTCarrierTypesModule { }
