import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { SettingController } from './setting.controller';
import { SettingRepository } from './setting.repository';
import { SettingService } from './setting.service';
@Module({
    imports: [
        TypeOrmModule.forFeature([SettingRepository]),
    ],
    controllers: [SettingController],
    providers: [SettingService],
    exports: [SettingService],
})
export class SettingModule { }
