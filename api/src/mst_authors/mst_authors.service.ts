import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { MSTAuthorRepository } from './mst_author.repository';
import { MST_Author } from './mst_author.entity';
import { DbGenService } from 'src/utils/DbGenService';
import { BiblioAuthorsService } from 'src/biblio_authors/biblio_authors.service';

@Injectable()
export class MSTAuthorsService extends DbGenService<MST_Author>  {
    constructor(
        @InjectRepository(MSTAuthorRepository)
        private MSTAuthorRepository: MSTAuthorRepository,
        @Inject(forwardRef(() => BiblioAuthorsService))
        private biblioAuthorsService: BiblioAuthorsService,
    ) {
        super(MSTAuthorRepository);
    }

    async createMSTAuthor(createMSTAuthorDto): Promise<any> {
        const findMSTAuthorByAuthorName = await this.findOne({ author_name: createMSTAuthorDto.author_name });
        if (findMSTAuthorByAuthorName) {
            throw new BadRequestException('Author is exist');
        }

        return await this.create(createMSTAuthorDto);
    }

    async updateMSTAuthorByAuthorId(author_id, updateMSTAuthorDto): Promise<any> {
        const findMSTAuthorByAuthorId = await this.findOne({ author_id: author_id });
        if (findMSTAuthorByAuthorId) {
            if (findMSTAuthorByAuthorId.author_name != updateMSTAuthorDto.author_name) {
                const findMSTAuthorByAuthorName = await this.findOne({ author_name: updateMSTAuthorDto.author_name });
                if (findMSTAuthorByAuthorName) {
                    throw new BadRequestException('Author is exist');
                }
            }
        }

        return await this.updateOne({ author_id }, updateMSTAuthorDto);
    }

    async deleteMSTAuthorByAuthorId(author_id) {
        const biblioAuthor = await this.biblioAuthorsService.find({ author_id: author_id });
        if(biblioAuthor.length > 0) {
            throw new BadRequestException('Author is still used in biblio');
        }

        return await this.deleteOne({ author_id });
    }
}