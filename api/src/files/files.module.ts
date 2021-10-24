import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { FilesRepository } from './file.repository';
import { BiblioAttachmentsModule } from 'src/biblio_attachments/biblio_attachments.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            FilesRepository
        ]),
        BiblioAttachmentsModule,
        AuthModule
    ],
    controllers: [FilesController],
    providers: [
        FilesService
    ],
    exports: [ FilesService ]
})
export class FilesModule { }
