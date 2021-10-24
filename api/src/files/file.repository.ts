import { EntityRepository, Repository, Like } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { Files } from './files.entity';

@EntityRepository(Files)
export class FilesRepository extends Repository<Files> {
}