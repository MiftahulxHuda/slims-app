import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { SearchBiblioRepository } from './search_biblio.repository';
import { SearchBibliosService } from './search_biblios.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([SearchBiblioRepository]),
        AuthModule
    ],
    controllers: [],
    providers: [SearchBibliosService],
    exports: [SearchBibliosService],
})
export class SearchBibliosModule { }
