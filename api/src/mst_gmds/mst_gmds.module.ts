import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { BibliosModule } from 'src/biblios/biblios.module';
import { MSTGMDRepository } from './mst_gmd.repository';
import { MSTGMDsController } from './mst_gmds.controller';
import { MSTGMDsService } from './mst_gmds.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            MSTGMDRepository,
        ]),
        AuthModule,
        BibliosModule,
    ],
    controllers: [MSTGMDsController],
    providers: [
        MSTGMDsService,
    ],
})
export class MSTGMDsModule { }
