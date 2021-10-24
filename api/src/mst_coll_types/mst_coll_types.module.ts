import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { MSTCollTypeRepository } from './mst_coll_type.repository';
import { MSTCollTypesController } from './mst_coll_types.controller';
import { MSTCollTypesService } from './mst_coll_types.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([MSTCollTypeRepository]),
        AuthModule
    ],
    controllers: [MSTCollTypesController],
    providers: [MSTCollTypesService],
})
export class MSTCollTypesModule { }
