import { EntityRepository, Repository, Like } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { MST_Language } from './mst_language.entity';

@EntityRepository(MST_Language)
export class MSTLanguageRepository extends Repository<MST_Language> {
}