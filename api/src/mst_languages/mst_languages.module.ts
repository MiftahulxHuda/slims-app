import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { MSTLanguageRepository } from './mst_language.repository';
import { MSTLanguagesController } from './mst_languages.controller';
import { MSTLanguagesService } from './mst_languages.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([MSTLanguageRepository]),
        AuthModule
    ],
    controllers: [MSTLanguagesController],
    providers: [MSTLanguagesService],
})
export class MSTLanguagesModule { }
