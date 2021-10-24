import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { MSTPublisherRepository } from './mst_publisher.repository';
import { MSTPublishersController } from './mst_publishers.controller';
import { MSTPublishersService } from './mst_publishers.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([MSTPublisherRepository]),
        AuthModule
    ],
    controllers: [MSTPublishersController],
    providers: [MSTPublishersService],
})
export class MSTPublishersModule { }
