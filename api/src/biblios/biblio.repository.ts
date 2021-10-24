import { EntityRepository, Repository, getConnection } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { Biblio } from './biblio.entity';
import { MST_GMD } from 'src/mst_gmds/mst_gmd.entity';
import { MST_Publisher } from 'src/mst_publishers/mst-publisher.entity';
import { MST_Language } from 'src/mst_languages/mst_language.entity';
import { MST_Place } from 'src/mst_places/mst_place.entity';
import { MST_Frequency } from 'src/mst_frequencies/mst_frequency.entity';
import { MST_Content_Type } from 'src/mst_content_types/mst_content_type.entity';
import { MST_Media_Type } from 'src/mst_media_types/mst_media_type.entity';
import { MST_Carrier_Type } from 'src/mst_carrier_types/mst_carrier_type.entity';
import { CreateBiblioDto } from './dto/create-biblio.dto';

@EntityRepository(Biblio)
export class BiblioRepository extends Repository<Biblio> {

  async getBiblios(filter, sort, pagination): Promise<Biblio[]> {
    const query = await this.createQueryBuilder("biblio")
      .select("biblio.*")
      .addSelect("mst_gmd.gmd_name AS gmd_name")
      .addSelect("mst_publisher.publisher_name AS publisher_name")
      .addSelect("mst_language.language_name AS language_name")
      .addSelect("mst_place.place_name AS place_name")
      .addSelect("mst_frequency.frequency AS frequency")
      .addSelect("mst_content_type.content_type AS content_type")
      .addSelect("mst_media_type.media_type AS media_type")
      .addSelect("mst_carrier_type.carrier_type AS carrier_type")
      .leftJoin(MST_GMD, "mst_gmd", "biblio.gmd_id = mst_gmd.gmd_id")
      .leftJoin(MST_Publisher, "mst_publisher", "biblio.publisher_id = mst_publisher.publisher_id")
      .leftJoin(MST_Language, "mst_language", "biblio.language_id = mst_language.language_id")
      .leftJoin(MST_Place, "mst_place", "biblio.publish_place_id = mst_place.place_id")
      .leftJoin(MST_Frequency, "mst_frequency", "biblio.frequency_id = mst_frequency.frequency_id")
      .leftJoin(MST_Content_Type, "mst_content_type", "biblio.content_type_id = mst_content_type.id")
      .leftJoin(MST_Media_Type, "mst_media_type", "biblio.media_type_id = mst_media_type.id")
      .leftJoin(MST_Carrier_Type, "mst_carrier_type", "biblio.carrier_type_id = mst_carrier_type.id")

    try {
      const tasks = await query.getRawMany();
      return tasks;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getBiblioById(biblio_id: number): Promise<Biblio> {
    const query = await this.createQueryBuilder("biblio")
      .select("biblio.*")
      .addSelect("mst_gmd.gmd_id AS gmd_id, mst_gmd.gmd_name AS gmd_name")
      .addSelect("mst_publisher.publisher_id AS publisher_id, mst_publisher.publisher_name AS publisher_name")
      .addSelect("mst_language.language_id AS language_id, mst_language.language_name AS language_name")
      .addSelect("mst_place.place_id AS publish_place_id, mst_place.place_name AS place_name")
      .addSelect("mst_frequency.frequency_id AS frequency_id, mst_frequency.frequency AS frequency")
      .addSelect("mst_content_type.id AS content_type_id, mst_content_type.content_type AS content_type")
      .addSelect("mst_media_type.id AS media_type_id, mst_media_type.media_type AS media_type")
      .addSelect("mst_carrier_type.id AS carrier_type_id, mst_carrier_type.carrier_type AS carrier_type")
      .leftJoin(MST_GMD, "mst_gmd", "biblio.gmd_id = mst_gmd.gmd_id")
      .leftJoin(MST_Publisher, "mst_publisher", "biblio.publisher_id = mst_publisher.publisher_id")
      .leftJoin(MST_Language, "mst_language", "biblio.language_id = mst_language.language_id")
      .leftJoin(MST_Place, "mst_place", "biblio.publish_place_id = mst_place.place_id")
      .leftJoin(MST_Frequency, "mst_frequency", "biblio.frequency_id = mst_frequency.frequency_id")
      .leftJoin(MST_Content_Type, "mst_content_type", "biblio.content_type_id = mst_content_type.id")
      .leftJoin(MST_Media_Type, "mst_media_type", "biblio.media_type_id = mst_media_type.id")
      .leftJoin(MST_Carrier_Type, "mst_carrier_type", "biblio.carrier_type_id = mst_carrier_type.id")
      .where("biblio.biblio_id = :biblio_id", { biblio_id: biblio_id })

    try {
      const tasks = await query.getRawOne();
      return tasks;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createBiblio(createBiblioDto: CreateBiblioDto): Promise<Biblio> {
    const {
      gmd_id,
      title,
      sor,
      edition,
      isbn_issn,
      publisher_id,
      publish_year,
      collation,
      series_title,
      call_number,
      language_id,
      // source,
      publish_place_id,
      classification,
      notes,
      // image,
      // file_att,
      opac_hide,
      promoted,
      // labels,
      frequency_id,
      // spec_detail_info,
      content_type_id,
      media_type_id,
      carrier_type_id,
      input_date,
      last_update,
      // uid
    } = createBiblioDto;

    const biblio = new Biblio();
    biblio.gmd_id = gmd_id;
    biblio.title = title;
    biblio.sor = sor;
    biblio.edition = edition;
    biblio.isbn_issn = isbn_issn;
    biblio.publisher_id = publisher_id;
    biblio.publish_year = publish_year;
    biblio.collation = collation;
    biblio.series_title = series_title;
    biblio.call_number = call_number;
    biblio.language_id = language_id;
    // biblio.source = source;
    biblio.publish_place_id = publish_place_id;
    biblio.classification = classification;
    biblio.notes = notes;
    // // biblio.image = image;
    // biblio.file_att = file_att;
    biblio.opac_hide = opac_hide;
    biblio.promoted = promoted;
    // biblio.labels = labels;
    biblio.frequency_id = frequency_id;
    // biblio.spec_detail_info = spec_detail_info;
    biblio.content_type_id = content_type_id;
    biblio.media_type_id = media_type_id;
    biblio.carrier_type_id = carrier_type_id;
    biblio.input_date = input_date;
    biblio.last_update = last_update;
    // biblio.uid = uid;

    try {
      await this.save(biblio);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return biblio;
  }

  async deleteQueryBuilder(entity, fields) {
    let query = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(entity)

    for (const key in fields) {
      await query.andWhere(`${key} = :${key}`, { [key]: fields[key] })
    }

    try {
      await query.execute();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}