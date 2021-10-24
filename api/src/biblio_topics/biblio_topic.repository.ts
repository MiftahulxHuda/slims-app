import { EntityRepository, Repository, Like } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { Biblio_Topic } from './biblio_topic.entity';

@EntityRepository(Biblio_Topic)
export class BiblioTopicRepository extends Repository<Biblio_Topic> {

    async getBiblioTopicsByBiblioId(biblio_id: number): Promise<Biblio_Topic[]> {
        try {
            const query = await this.query(`
                SELECT biblio_topic.*, mst_topic.topic as topic_name
                FROM biblio_topic
                RIGHT JOIN mst_topic
                ON biblio_topic.topic_id = mst_topic.topic_id
                WHERE biblio_topic.biblio_id = ${biblio_id}
            `)

            return query
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}