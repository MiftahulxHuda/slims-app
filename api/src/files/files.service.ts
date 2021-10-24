import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FilesRepository } from './file.repository';
import { Files } from './files.entity';
import { DbGenService } from 'src/utils/DbGenService';

@Injectable()
export class FilesService extends DbGenService<Files> {
    constructor(
        @InjectRepository(FilesRepository)
        private filesRepository: FilesRepository,
    ) {
        super(filesRepository);
    }
}