import { EntityRepository, Repository, Like } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { Biblio_Author } from './biblio_author.entity';

@EntityRepository(Biblio_Author)
export class BiblioAuthorRepository extends Repository<Biblio_Author> {

    async getBiblioAuthorsByBiblioId(biblio_id: number): Promise<Biblio_Author[]> {
        try {
            const query = await this.query(`
                SELECT biblio_author.*, mst_author.author_name as author_name
                FROM biblio_author
                RIGHT JOIN mst_author
                ON biblio_author.author_id = mst_author.author_id
                WHERE biblio_author.biblio_id = ${biblio_id}
            `)

            return query
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}