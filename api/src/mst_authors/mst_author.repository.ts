import { EntityRepository, Repository, Like } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { MST_Author } from './mst_author.entity';

@EntityRepository(MST_Author)
export class MSTAuthorRepository extends Repository<MST_Author> {
}