import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { MSTMemberTypeController } from './mst_member_type.controller';
import { MSTMemberTypeRepository } from './mst_member_type.repository';
import { MSTMemberTypeService } from './mst_member_type.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([MSTMemberTypeRepository]),
    ],
    controllers: [MSTMemberTypeController],
    providers: [MSTMemberTypeService],
    exports: [MSTMemberTypeService],
})
export class MSTMemberTypeModule { }
