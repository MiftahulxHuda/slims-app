import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DbGenService } from 'src/utils/DbGenService';
import { BiblioAuthorsService } from 'src/biblio_authors/biblio_authors.service';
import { Setting } from './setting.entity';
import { SettingRepository } from './setting.repository';
import * as phpUnserialize from 'phpunserialize';
import { serialize, Class as Serialization } from 'php-serialization';

@Injectable()
export class SettingService extends DbGenService<Setting>  {
    constructor(
        @InjectRepository(SettingRepository)
        private settingRepository: SettingRepository,
    ) {
        super(settingRepository);
    }

    async getItemCodePattern() {
        const setting = await this.findOne({ setting_name: "batch_item_code_pattern" })
        let result = { data: [] }
        if(setting) {
            const pattern = phpUnserialize(setting.setting_value);
            console.log(pattern)
            for (let index = 0; index < pattern.length; index++) {
                const element = pattern[index];
                result['data'].push({ index: index, pattern: element })
            }
            return result;
        } else {
            return result
        }
    }

    async createItemCodePattern(createItemCodePatternDto): Promise<any> {
        console.log(createItemCodePatternDto)
        let length_sn = "";
        for (let index = 0; index < parseInt(createItemCodePatternDto.length_sn); index++) {
            const element = createItemCodePatternDto.length_sn[index];
            length_sn += "0";
        }
        const pattern = createItemCodePatternDto.prefix + length_sn + createItemCodePatternDto.suffix;

        let getItemCodePattern: any = await this.getItemCodePattern();
        var c = new Serialization('');
        for (let index = 0; index < getItemCodePattern.length; index++) {
            const element = getItemCodePattern[index];
            console.log(element)
            c.__addAttr__(index, 'integer', element, 'string');
        }

        c.__addAttr__(getItemCodePattern.length, 'integer', pattern, 'string');

        console.log(serialize(c, 'array'))
        let post = {}
        post['setting_value'] = serialize(c, 'array');
        return await this.updateOne({ setting_name: "batch_item_code_pattern" }, post);
    }
}