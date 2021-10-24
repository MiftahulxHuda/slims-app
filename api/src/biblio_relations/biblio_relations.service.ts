import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BiblioRelationRepository } from './biblio_relation.repository';
import { Biblio_Relation } from './biblio_relation.entity';
import { DbGenService } from 'src/utils/DbGenService';

@Injectable()
export class BiblioRelationsService extends DbGenService<Biblio_Relation> {
    constructor(
        @InjectRepository(BiblioRelationRepository)
        private biblioRelationRepository: BiblioRelationRepository,
    ) {
        super(biblioRelationRepository)
    }

    async getBiblioRelationsByBiblioId(biblio_id: number): Promise<Biblio_Relation[]> {
        return this.biblioRelationRepository.getBiblioRelationsByBiblioId(biblio_id);
    }

    async createBiblioRelation(createBiblioRelationDto): Promise<any> {
        const findBiblioRelation = await this.findOne({
            biblio_id: createBiblioRelationDto.biblio_id,
            rel_biblio_id: createBiblioRelationDto.rel_biblio_id,
        });
        if (findBiblioRelation) {
            throw new BadRequestException('Biblio Relation is exist');
        }

        createBiblioRelationDto['rel_type'] = 1;
        return await this.create(createBiblioRelationDto);
    }

    async createBiblioRelationByBiblioIdDto(biblio_id, createBiblioRelationDto): Promise<any> {
        for (let index = 0; index < createBiblioRelationDto.length; index++) {
            const element = createBiblioRelationDto[index];
            element['biblio_id'] = biblio_id;
            await this.create(element);
        }

        return createBiblioRelationDto;
    }
}