import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { MSTItemStatusRepository } from './mst_item_status.repository';
import { MSTItemStatusesController } from './mst_item_statuses.controller';
import { MSTItemStatusesService } from './mst_item_statuses.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([MSTItemStatusRepository]),
        AuthModule
    ],
    controllers: [MSTItemStatusesController],
    providers: [MSTItemStatusesService],
})
export class MSTItemStatusesModule { }
