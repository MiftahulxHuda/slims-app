import { EntityRepository, Repository, getConnection } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { Search_Biblio } from './search_biblio.entity';

@EntityRepository(Search_Biblio)
export class SearchBiblioRepository extends Repository<Search_Biblio> {

    // async createSearchBiblio(createSearchBiblioDto: CreateSearchBiblioDto): Promise<Search_Biblio> {
    //     const {
    //         biblio_id,
    //         title,
    //         edition,
    //         isbn_issn,
    //         author,
    //         gmd,
    //         publisher,
    //         publish_place,
    //         language,
    //         classification,
    //         spec_detail_info,
    //         carrier_type,
    //         content_type,
    //         media_type,
    //         location,
    //         publish_year,
    //         notes,
    //         series_title,
    //         items,
    //         collection_types,
    //         call_number,
    //         opac_hide,
    //         promoted,
    //         labels,
    //         collation,
    //         image,
    //         input_date,
    //         last_update
    //     } = createSearchBiblioDto;

    //     const search_biblio = new Search_Biblio();
    //     search_biblio.biblio_id = biblio_id;
    //     search_biblio.title = title;
    //     search_biblio.edition = edition;
    //     search_biblio.isbn_issn = isbn_issn;
    //     search_biblio.author = author;
    //     search_biblio.gmd = gmd;
    //     search_biblio.publisher = publisher;
    //     search_biblio.publish_place = publish_place;
    //     search_biblio.language = language;
    //     search_biblio.classification = classification;
    //     search_biblio.spec_detail_info = spec_detail_info;
    //     search_biblio.carrier_type = carrier_type;
    //     search_biblio.content_type = content_type;
    //     search_biblio.media_type = media_type;
    //     search_biblio.location = location;
    //     search_biblio.publish_year = publish_year;
    //     search_biblio.notes = notes;
    //     search_biblio.series_title = series_title;
    //     search_biblio.items = items;
    //     search_biblio.collection_types = collection_types;
    //     search_biblio.call_number = call_number;
    //     search_biblio.opac_hide = opac_hide;
    //     search_biblio.promoted = promoted;
    //     search_biblio.labels = labels;
    //     search_biblio.collation = collation;
    //     search_biblio.image = image;
    //     search_biblio.input_date = input_date;
    //     search_biblio.last_update = last_update;

    //     try {
    //         await this.save(search_biblio);
    //     } catch (error) {
    //         throw new InternalServerErrorException();
    //     }

    //     return search_biblio;
    // }
}