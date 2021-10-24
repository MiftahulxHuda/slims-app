import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { BibliosController } from './biblios.controller';
import { BibliosService } from './biblios.service';
import { BiblioRepository } from './biblio.repository';
import { SearchBibliosService } from 'src/search_biblios/search_biblios.service';
import { SearchBiblioRepository } from 'src/search_biblios/search_biblio.repository';
import { BiblioAuthorsService } from 'src/biblio_authors/biblio_authors.service';
import { BiblioAuthorRepository } from 'src/biblio_authors/biblio_author.repository';
import { BiblioTopicRepository } from 'src/biblio_topics/biblio_topic.repository';
import { BiblioTopicsService } from 'src/biblio_topics/biblio_topics.service';
import { BiblioAttachmentRepository } from 'src/biblio_attachments/biblio_attachment.repository';
import { BiblioAttachmentsService } from 'src/biblio_attachments/biblio_attachments.service';
import { MSTAuthorRepository } from 'src/mst_authors/mst_author.repository';
import { MSTAuthorsService } from 'src/mst_authors/mst_authors.service';
import { MSTTopicRepository } from 'src/mst_topics/mst_topic.repository';
import { MSTTopicsService } from 'src/mst_topics/mst_topics.service';
import { FilesRepository } from 'src/files/file.repository';
import { FilesService } from 'src/files/files.service';
import { BiblioRelationRepository } from 'src/biblio_relations/biblio_relation.repository';
import { BiblioRelationsService } from 'src/biblio_relations/biblio_relations.service';
import { FilesModule } from 'src/files/files.module';
import { MSTTopicsModule } from 'src/mst_topics/mst_topics.module';
import { MSTAuthorsModule } from 'src/mst_authors/mst_authors.module';
import { SearchBibliosModule } from 'src/search_biblios/search_biblios.module';
import { BiblioRelationsModule } from 'src/biblio_relations/biblio_relations.module';
import { BiblioAttachmentsModule } from 'src/biblio_attachments/biblio_attachments.module';
import { BiblioTopicsModule } from 'src/biblio_topics/biblio_topics.module';
import { BiblioAuthorsModule } from 'src/biblio_authors/biblio_authors.module';
import { ItemsModule } from 'src/items/items.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            BiblioRepository,
        ]),
        BiblioAuthorsModule,
        BiblioTopicsModule,
        BiblioAttachmentsModule,
        BiblioRelationsModule,
        SearchBibliosModule,
        MSTAuthorsModule,
        MSTTopicsModule,
        FilesModule,
        AuthModule,
        forwardRef(() => ItemsModule),
    ],
    controllers: [BibliosController],
    providers: [
        BibliosService,
    ],
    exports: [ BibliosService ]
})
export class BibliosModule { }
