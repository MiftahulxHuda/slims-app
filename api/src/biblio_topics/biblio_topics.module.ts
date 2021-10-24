import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { MSTTopicRepository } from 'src/mst_topics/mst_topic.repository';
import { MSTTopicsModule } from 'src/mst_topics/mst_topics.module';
import { MSTTopicsService } from 'src/mst_topics/mst_topics.service';
import { SearchBiblioRepository } from 'src/search_biblios/search_biblio.repository';
import { SearchBibliosModule } from 'src/search_biblios/search_biblios.module';
import { SearchBibliosService } from 'src/search_biblios/search_biblios.service';
import { BiblioTopicRepository } from './biblio_topic.repository';
import { BiblioTopicsService } from './biblio_topics.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            BiblioTopicRepository,
        ]),
        SearchBibliosModule,
        MSTTopicsModule,
        AuthModule
    ],
    controllers: [],
    providers: [
        BiblioTopicsService,
    ],
    exports: [ BiblioTopicsService ]
})
export class BiblioTopicsModule { }
