import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { BiblioAttachmentRepository } from './biblio_attachment.repository';
import { BiblioAttachmentsService } from './biblio_attachments.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([BiblioAttachmentRepository]),
        AuthModule
    ],
    controllers: [],
    providers: [BiblioAttachmentsService],
    exports: [BiblioAttachmentsService],
})
export class BiblioAttachmentsModule { }
