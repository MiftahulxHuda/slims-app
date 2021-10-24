import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { MSTLanguageRepository } from './mst_language.repository';
import { MST_Language } from './mst_language.entity';
import { DbGenService } from 'src/utils/DbGenService';

@Injectable()
export class MSTLanguagesService extends DbGenService<MST_Language>  {
    constructor(
        @InjectRepository(MSTLanguageRepository)
        private MSTLanguageRepository: MSTLanguageRepository,
    ) {
        super(MSTLanguageRepository);
    }

    async createMSTLanguage(createMSTLanguageDto): Promise<any> {
        const findMSTLanguageByLanguageId = await this.findOne({ language_id: createMSTLanguageDto.language_id });
        if (findMSTLanguageByLanguageId) {
            throw new BadRequestException('Language is exist');
        }
        
        const findMSTLanguageByLanguage = await this.findOne({ language_name: createMSTLanguageDto.language_name });
        if (findMSTLanguageByLanguage) {
            throw new BadRequestException('Language is exist');
        }

        return await this.create(createMSTLanguageDto);
    }

    async updateMSTLanguageById(language_id, updateMSTLanguageDto): Promise<any> {
        const findMSTLanguageByLanguageId = await this.findOne({ language_id: language_id });
        if (findMSTLanguageByLanguageId) {
            if (findMSTLanguageByLanguageId.language_id != updateMSTLanguageDto.language_id) {
                const findMSTLanguageByLanguageId = await this.findOne({ language_id: updateMSTLanguageDto.language_id });
                if (findMSTLanguageByLanguageId) {
                    throw new BadRequestException('Language is exist');
                }
            }
            
            if (findMSTLanguageByLanguageId.language_name != updateMSTLanguageDto.language_name) {
                const findMSTLanguageByLanguage = await this.findOne({ language_name: updateMSTLanguageDto.language_name });
                if (findMSTLanguageByLanguage) {
                    throw new BadRequestException('Language is exist');
                }
            }
        }

        return await this.updateOne({ language_id }, updateMSTLanguageDto);
    }
}