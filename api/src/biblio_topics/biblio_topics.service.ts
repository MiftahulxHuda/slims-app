import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BiblioTopicRepository } from './biblio_topic.repository';
import { Biblio_Topic } from './biblio_topic.entity';
import { DbGenService } from 'src/utils/DbGenService';
import { SearchBibliosService } from 'src/search_biblios/search_biblios.service';
import { MSTTopicsService } from 'src/mst_topics/mst_topics.service';

@Injectable()
export class BiblioTopicsService extends DbGenService<Biblio_Topic>{
    constructor(
        @InjectRepository(BiblioTopicRepository)
        private biblioTopicRepository: BiblioTopicRepository,
        private searchBibliosService: SearchBibliosService,
        private MSTTopicsService: MSTTopicsService,
    ) {
        super(biblioTopicRepository);
    }

    async getBiblioTopicsByBiblioId(biblio_id: number): Promise<Biblio_Topic[]> {
        return this.biblioTopicRepository.getBiblioTopicsByBiblioId(biblio_id);
    }

    async createBiblioTopic(createBiblioTopicDto): Promise<any> {
        const findBiblioTopic = await this.findOne({
            biblio_id: createBiblioTopicDto.biblio_id,
            topic_id: createBiblioTopicDto.topic_id,
        });
        if (findBiblioTopic) {
            throw new BadRequestException('Topic is exist');
        }

        const createdBiblioTopic = await this.create(createBiblioTopicDto);

        const topic = await this.MSTTopicsService.findOneWithoutNotFound({
            topic_id: createBiblioTopicDto.topic_id
        });
        const searchBiblio = await this.searchBibliosService.findOneWithoutNotFound({
            biblio_id: createBiblioTopicDto.biblio_id
        });
        let searchBiblioTopic: any = [];
        if (searchBiblio.topic) {
            searchBiblioTopic = searchBiblio.topic.split("-");
            searchBiblioTopic = searchBiblioTopic.map(s => s.trim());

        }
        
        searchBiblioTopic.push(topic.topic)

        await this.searchBibliosService.updateOne({
            biblio_id: createBiblioTopicDto.biblio_id
        }, { topic: searchBiblioTopic.join(' - ') })

        return createdBiblioTopic;
    }

    async createBiblioTopicByBiblioIdDto(biblio_id, createBiblioTopicDto): Promise<any> {
        for (let index = 0; index < createBiblioTopicDto.length; index++) {
            const element = createBiblioTopicDto[index];
            element['biblio_id'] = biblio_id;
            await this.create(element);
        }

        return createBiblioTopicDto;
    }
}