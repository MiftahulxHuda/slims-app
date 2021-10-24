import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { SearchBiblioRepository } from './search_biblio.repository';
import { Search_Biblio } from './search_biblio.entity';
import { DbGenService } from 'src/utils/DbGenService';

@Injectable()
export class SearchBibliosService extends DbGenService<Search_Biblio> {
  constructor(
    @InjectRepository(SearchBiblioRepository)
    private searchbiblioRepository: SearchBiblioRepository,
  ) {
    super(searchbiblioRepository);
  }
}