import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { MSTPlaceRepository } from './mst_place.repository';
import { MSTPlacesController } from './mst_places.controller';
import { MSTPlacesService } from './mst_places.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([MSTPlaceRepository]),
        AuthModule
    ],
    controllers: [MSTPlacesController],
    providers: [MSTPlacesService],
})
export class MSTPlacesModule { }
