import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { MSTTopicRepository } from './mst_topic.repository';
import { MSTTopicsController } from './mst_topics.controller';
import { MSTTopicsService } from './mst_topics.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([MSTTopicRepository]),
        AuthModule
    ],
    controllers: [MSTTopicsController],
    providers: [MSTTopicsService],
    exports: [MSTTopicsService],
})
export class MSTTopicsModule { }
