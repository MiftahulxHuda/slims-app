import { EntityRepository, Repository, Like } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { Setting } from './setting.entity';

@EntityRepository(Setting)
export class SettingRepository extends Repository<Setting> {
}