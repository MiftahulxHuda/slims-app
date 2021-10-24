import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { BiblioAuthorsModule } from 'src/biblio_authors/biblio_authors.module';
import { MSTAuthorRepository } from './mst_author.repository';
import { MSTAuthorsController } from './mst_authors.controller';
import { MSTAuthorsService } from './mst_authors.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([MSTAuthorRepository]),
        AuthModule,
        forwardRef(() => BiblioAuthorsModule),
    ],
    controllers: [MSTAuthorsController],
    providers: [MSTAuthorsService],
    exports: [MSTAuthorsService],
})
export class MSTAuthorsModule { }
