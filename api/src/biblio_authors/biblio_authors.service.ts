import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BiblioAuthorRepository } from './biblio_author.repository';
import { Biblio_Author } from './biblio_author.entity';
import { DbGenService } from 'src/utils/DbGenService';
import { MSTAuthorsService } from 'src/mst_authors/mst_authors.service';
import { SearchBibliosService } from 'src/search_biblios/search_biblios.service';

@Injectable()
export class BiblioAuthorsService extends DbGenService<Biblio_Author> {
    constructor(
        @InjectRepository(BiblioAuthorRepository)
        private biblioAuthorRepository: BiblioAuthorRepository,
        @Inject(forwardRef(() => MSTAuthorsService))
        private MSTAuthorsService: MSTAuthorsService,
        private searchBibliosService: SearchBibliosService,
    ) {
        super(biblioAuthorRepository);
    }

    async getBiblioAuthorsByBiblioId(biblio_id: number): Promise<Biblio_Author[]> {
        return this.biblioAuthorRepository.getBiblioAuthorsByBiblioId(biblio_id);
    }

    async createBiblioAuthor(createBiblioAuthorDto): Promise<any> {
        const findBiblioAuthor = await this.findOne({ 
            biblio_id: createBiblioAuthorDto.biblio_id,
            author_id: createBiblioAuthorDto.author_id,
        });
        if (findBiblioAuthor) {
            throw new BadRequestException('Author is exist');
        }

        await this.create(createBiblioAuthorDto);

        const createdBiblioAuthor = await this.create(createBiblioAuthorDto);

        const author = await this.MSTAuthorsService.findOneWithoutNotFound({
            author_id: createBiblioAuthorDto.author_id
        });
        const searchBiblio = await this.searchBibliosService.findOneWithoutNotFound({
            biblio_id: createBiblioAuthorDto.biblio_id
        });
        let searchBiblioAuthor: any = [];
        if (searchBiblio.author) {
            searchBiblioAuthor = searchBiblio.author.split("-");
            searchBiblioAuthor = searchBiblioAuthor.map(s => s.trim());

        }
        
        searchBiblioAuthor.push(author.author_name)

        await this.searchBibliosService.updateOne({
            biblio_id: createBiblioAuthorDto.biblio_id
        }, { author: searchBiblioAuthor.join(' - ') })

        return createdBiblioAuthor;
    }

    async createBiblioAuthorByBiblioId(biblio_id, createBiblioAuthorDto): Promise<any> {
        for (let index = 0; index < createBiblioAuthorDto.length; index++) {
            const element = createBiblioAuthorDto[index];
            element['biblio_id'] = biblio_id;
            await this.create(element);
        }

        return createBiblioAuthorDto;
    }
}