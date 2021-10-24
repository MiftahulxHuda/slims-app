import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { MSTContentTypeRepository } from './mst_content_type.repository';
import { MSTContentTypesController } from './mst_content_types.controller';
import { MSTContentTypesService } from './mst_content_types.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([MSTContentTypeRepository]),
        AuthModule
    ],
    controllers: [MSTContentTypesController],
    providers: [MSTContentTypesService],
})
export class MSTContentTypesModule { }
