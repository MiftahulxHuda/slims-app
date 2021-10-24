import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { MSTAuthorRepository } from 'src/mst_authors/mst_author.repository';
import { MSTAuthorsModule } from 'src/mst_authors/mst_authors.module';
import { MSTAuthorsService } from 'src/mst_authors/mst_authors.service';
import { SearchBiblioRepository } from 'src/search_biblios/search_biblio.repository';
import { SearchBibliosModule } from 'src/search_biblios/search_biblios.module';
import { SearchBibliosService } from 'src/search_biblios/search_biblios.service';
import { BiblioAuthorRepository } from './biblio_author.repository';
import { BiblioAuthorsService } from './biblio_authors.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            BiblioAuthorRepository,
        ]),
        forwardRef(() => MSTAuthorsModule),
        SearchBibliosModule,
        AuthModule
    ],
    controllers: [],
    providers: [
        BiblioAuthorsService,
    ],
    exports: [ BiblioAuthorsService ]
})
export class BiblioAuthorsModule { }
