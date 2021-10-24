import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { MSTLocationRepository } from './mst_location.repository';
import { MSTLocationsController } from './mst_locations.controller';
import { MSTLocationsService } from './mst_locations.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([MSTLocationRepository]),
        AuthModule
    ],
    controllers: [MSTLocationsController],
    providers: [MSTLocationsService],
})
export class MSTLocationsModule { }
