import { EntityRepository, Repository, Like } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { MST_Frequency } from './mst_frequency.entity';
import { MST_Language } from 'src/mst_languages/mst_language.entity';

@EntityRepository(MST_Frequency)
export class MSTFrequencyRepository extends Repository<MST_Frequency> {
    async getFrequencies(filter, sort, pagination): Promise<any> {
        const query = await this.createQueryBuilder("mst_frequency")
            .select("mst_frequency.*")
            .addSelect("mst_language.language_name AS language_name")
            .leftJoin(MST_Language, "mst_language", "mst_language.language_id = mst_frequency.language_prefix")

        if (filter) {
            for (const key in filter) {
                query.andWhere('mst_frequency.frequency like :frequency', { frequency: `%${filter[key]}%` })
            }
        }

        if (sort) {
            for (const key in sort) {
                query.addOrderBy(key, sort[key])
            }
        }

        query.offset(pagination.skip)
            .limit(pagination.take)

        try {
            const tasks = await query.getRawMany();
            let result = {};
            result['data'] = tasks;
            result['count'] = tasks.length;
            return result;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}