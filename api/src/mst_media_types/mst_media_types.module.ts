import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { MSTMediaTypeRepository } from './mst_media_type.repository';
import { MSTMediaTypesController } from './mst_media_types.controller';
import { MSTMediaTypesService } from './mst_media_types.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([MSTMediaTypeRepository]),
        AuthModule
    ],
    controllers: [MSTMediaTypesController],
    providers: [MSTMediaTypesService],
})
export class MSTMediaTypesModule { }
