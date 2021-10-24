import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as phpUnserialize from 'phpunserialize';
import { serialize, Class as Serialization } from 'php-serialization';

import { BiblioAttachmentRepository } from './biblio_attachment.repository';
import { Biblio_Attachment, Placement } from './biblio_attachment.entity';
import { DbGenService } from 'src/utils/DbGenService';

@Injectable()
export class BiblioAttachmentsService extends DbGenService<Biblio_Attachment> {
    constructor(
        @InjectRepository(BiblioAttachmentRepository)
        private biblioAttachmentRepository: BiblioAttachmentRepository,
    ) {
        super(biblioAttachmentRepository)
    }

    async getBiblioAttachmentsByBiblioId(biblio_id: number): Promise<any> {
        const biblioAttachment: any = await this.biblioAttachmentRepository.getBiblioAttachmentsByBiblioId(biblio_id);
        for (let index = 0; index < biblioAttachment.length; index++) {
            const element = biblioAttachment[index];
            // switch (element.placement) {
            //     case Placement.LINK:
            //         biblioAttachment[index]['placement'] = 0;
            //         break;

            //     case Placement.POPUP:
            //         biblioAttachment[index]['placement'] = 1;
            //         break;

            //     case Placement.EMBED:
            //         biblioAttachment[index]['placement'] = 2;
            //         break;

            //     default:
            //         break;
            // }

            if (element.access_limit) {
                biblioAttachment[index]['access_limit'] = phpUnserialize(element['access_limit']);
            }
        }
        return biblioAttachment;
    }

    getPlacementEnumInBiblioAttachment(placement) {
        let placementEnum = "";
        switch (placement) {
            case 0:
                placementEnum = 'link';
                break;

            case 1:
                placementEnum = 'popup';
                break;

            case 2:
                placementEnum = 'embed';
                break;

            default:
                break;
        }
        return placementEnum;
    }

    async createBiblioAttachmentByBiblioIdDto(biblio_id, createBiblioAttachmentDto): Promise<any> {
        for (let index = 0; index < createBiblioAttachmentDto.length; index++) {
            const element = createBiblioAttachmentDto[index];
            element['biblio_id'] = biblio_id;
            if (element['access_limit'].length > 0) {
                var c = new Serialization('');
                for (let iAccesLimit = 0; iAccesLimit < element['access_limit'].length; iAccesLimit++) {
                    const elAccessLimit = element['access_limit'][iAccesLimit];
                    c.__addAttr__(iAccesLimit, 'integer', elAccessLimit, 'string');
                }
                element['access_limit'] = serialize(c, 'array');
            } else {
                element['access_limit'] = null;
            }

            element['placement'] = this.getPlacementEnumInBiblioAttachment(element['placement'])
            await this.create(element);
        }

        return createBiblioAttachmentDto;
    }
}