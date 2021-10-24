import { EntityRepository, Repository, Like } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { Biblio_Relation } from './biblio_relation.entity';

@EntityRepository(Biblio_Relation)
export class BiblioRelationRepository extends Repository<Biblio_Relation> {

    async getBiblioRelationsByBiblioId(biblio_id: number): Promise<Biblio_Relation[]> {
        try {
            const query = await this.query(`
                SELECT biblio_relation.*, biblio.title as title
                FROM biblio_relation
                RIGHT JOIN biblio
                ON biblio_relation.rel_biblio_id = biblio.biblio_id
                WHERE biblio_relation.biblio_id = ${biblio_id}
            `)

            return query
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}