import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { MSTFrequencyRepository } from './mst_frequency.repository';
import { MSTFrequenciesController } from './mst_frequencies.controller';
import { MSTFrequenciesService } from './mst_frequencies.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([MSTFrequencyRepository]),
        AuthModule
    ],
    controllers: [MSTFrequenciesController],
    providers: [MSTFrequenciesService],
})
export class MSTFrequenciesModule { }
