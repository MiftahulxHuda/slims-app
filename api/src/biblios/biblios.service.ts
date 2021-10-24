import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { serialize, Class as Serialization } from 'php-serialization';

import { BiblioRepository } from './biblio.repository';
import { Biblio } from './biblio.entity';
import { Biblio_Attachment } from 'src/biblio_attachments/biblio_attachment.entity';
import { Biblio_Author } from 'src/biblio_authors/biblio_author.entity';
import { Biblio_Custom } from 'src/biblio_customs/biblio_custom.entity';
import { Biblio_Log } from 'src/biblio_logs/biblio_log.entity';
import { Biblio_Topic } from 'src/biblio_topics/biblio_topic.entity';
import { Comment } from 'src/comments/comments.entity';
import { Item } from 'src/items/item.entity';
import { Loan_History } from 'src/loan_histories/loan_history.entity';
import { Search_Biblio } from 'src/search_biblios/search_biblio.entity';
import { Serial } from 'src/serials/serial.entity';
import { CreateBiblioDto } from './dto/create-biblio.dto';
import { DbGenService } from 'src/utils/DbGenService';
import { BiblioAuthorsService } from 'src/biblio_authors/biblio_authors.service';
import { BiblioTopicsService } from 'src/biblio_topics/biblio_topics.service';
import { BiblioAttachmentsService } from 'src/biblio_attachments/biblio_attachments.service';
import { SearchBibliosService } from 'src/search_biblios/search_biblios.service';
import { MSTAuthorsService } from 'src/mst_authors/mst_authors.service';
import { MSTTopicsService } from 'src/mst_topics/mst_topics.service';
import { FilesService } from 'src/files/files.service';
import { UpdateBiblioDto } from './dto/update-biblio.dto';
import { BiblioRelationsService } from 'src/biblio_relations/biblio_relations.service';
import { ItemsService } from 'src/items/items.service';

@Injectable()
export class BibliosService extends DbGenService<Biblio> {
  constructor(
    @InjectRepository(BiblioRepository)
    private biblioRepository: BiblioRepository,
    private biblioAuthorService: BiblioAuthorsService,
    private biblioTopicService: BiblioTopicsService,
    private biblioAttachmentService: BiblioAttachmentsService,
    private biblioRelationService: BiblioRelationsService,
    private searchBiblioService: SearchBibliosService,
    private MSTAuthorsService: MSTAuthorsService,
    private MSTTopicsService: MSTTopicsService,
    private filesService: FilesService,
    @Inject(forwardRef(() => ItemsService))
    private itemsService: ItemsService,
  ) {
    super(biblioRepository);
  }

  async getBiblios(filter, sort, pagination): Promise<Biblio[]> {
    return this.biblioRepository.getBiblios(filter, sort, pagination);
  }

  async getBiblioById(biblio_id: number): Promise<Biblio> {
    return this.biblioRepository.getBiblioById(biblio_id);
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

  async createBiblio(createBiblioDto: CreateBiblioDto): Promise<any> {
    const findBiblioByTitle = await this.findOne({
      title: createBiblioDto.title,
    });
    if (findBiblioByTitle) {
      throw new BadRequestException('Title is exist');
    }

    return this.create(createBiblioDto);
  }


  // async createBiblio(createBiblioDto: CreateBiblioDto): Promise<any> {
  //   const findBiblioByTitle = await this.findOne({
  //     title: createBiblioDto.title,
  //   });
  //   if (findBiblioByTitle) {
  //     throw new BadRequestException('Title is exist');
  //   }

  //   let biblioAuthor = createBiblioDto.author;
  //   delete createBiblioDto['author'];

  //   let biblioTopic = createBiblioDto.topic;
  //   delete createBiblioDto['topic'];

  //   let biblioAttachment: any = createBiblioDto.attachment;
  //   delete createBiblioDto['attachment'];

  //   let biblioRelation = createBiblioDto.relation;
  //   delete createBiblioDto['relation'];

  //   // Create object for return to user
  //   let objectReturn: any = { ...createBiblioDto };

  //   let createdBiblio = await this.create(createBiblioDto);
  //   objectReturn['biblio_id'] = createdBiblio.biblio_id;

  //   let author = [];
  //   if (biblioAuthor.length > 0) {
  //     for (let index = 0; index < biblioAuthor.length; index++) {
  //       biblioAuthor[index]['biblio_id'] = createdBiblio.biblio_id;
  //       author.push(biblioAuthor[index]['author_name']);
  //     }

  //     await this.biblioAuthorService.create(
  //       biblioAuthor,
  //     );
  //   }
  //   objectReturn['author'] = biblioAuthor;

  //   let topic = [];
  //   if (biblioTopic.length > 0) {
  //     for (let index = 0; index < biblioTopic.length; index++) {
  //       biblioTopic[index]['biblio_id'] = createdBiblio.biblio_id;
  //       topic.push(biblioTopic[index]['topic_name']);
  //     }

  //     await this.biblioTopicService.create(
  //       biblioTopic,
  //     );
  //   }
  //   objectReturn['topic'] = biblioTopic;

  //   if (biblioAttachment.length > 0) {
  //     for (let index = 0; index < biblioAttachment.length; index++) {
  //       if (biblioAttachment[index]['access_limit']) {
  //         var c = new Serialization('');
  //         c.__addAttr__(0, 'integer', '1', 'string');
  //         biblioAttachment[index]['access_limit'] = serialize(c, 'array');
  //       } else {
  //         biblioAttachment[index]['access_limit'] = null;
  //       }

  //       biblioAttachment[index]['placement'] = this.getPlacementEnumInBiblioAttachment(biblioAttachment[index]['placement']);
  //       biblioAttachment[index]['biblio_id'] = createdBiblio.biblio_id;
  //     }

  //     await this.biblioAttachmentService.create(
  //       biblioAttachment,
  //     );
  //   }
  //   objectReturn['attachment'] = biblioAttachment;

  //   if (biblioRelation.length > 0) {
  //     for (let index = 0; index < biblioRelation.length; index++) {
  //       biblioRelation[index]['biblio_id'] = createdBiblio.biblio_id;
  //       biblioRelation[index]['rel_type'] = 1;
  //     }

  //     await this.biblioRelationService.create(
  //       biblioRelation,
  //     );
  //   }
  //   objectReturn['relation'] = biblioRelation;

  //   const findBiblioByBiblioIdAfterCreate: any = await this.getBiblioById(
  //     createdBiblio.biblio_id,
  //   );

  //   const createSearchBiblio = {
  //     biblio_id: findBiblioByBiblioIdAfterCreate.biblio_id,
  //     title: findBiblioByBiblioIdAfterCreate.title,
  //     edition: findBiblioByBiblioIdAfterCreate.edition,
  //     isbn_issn: findBiblioByBiblioIdAfterCreate.isbn_issn,
  //     author: author.join(' - '),
  //     topic: topic.join(' - '),
  //     gmd: findBiblioByBiblioIdAfterCreate.gmd_name,
  //     publisher: findBiblioByBiblioIdAfterCreate.publisher_name,
  //     publish_place: findBiblioByBiblioIdAfterCreate.place_name,
  //     language: findBiblioByBiblioIdAfterCreate.language_name,
  //     classification: findBiblioByBiblioIdAfterCreate.classification,
  //     spec_detail_info: findBiblioByBiblioIdAfterCreate.spec_detail_info,
  //     carrier_type: findBiblioByBiblioIdAfterCreate.carrier_type
  //       ? findBiblioByBiblioIdAfterCreate.carrier_type
  //       : '',
  //     content_type: findBiblioByBiblioIdAfterCreate.content_type
  //       ? findBiblioByBiblioIdAfterCreate.content_type
  //       : '',
  //     media_type: findBiblioByBiblioIdAfterCreate.media_type
  //       ? findBiblioByBiblioIdAfterCreate.media_type
  //       : '',
  //     // location: findBiblioByBiblioIdAfterCreate.location,
  //     publish_year: findBiblioByBiblioIdAfterCreate.publish_year,
  //     notes: findBiblioByBiblioIdAfterCreate.notes,
  //     series_title: findBiblioByBiblioIdAfterCreate.series_title,
  //     // items: findBiblioByBiblioIdAfterCreate.items,
  //     // collection_types: findBiblioByBiblioIdAfterCreate.collection_types,
  //     call_number: findBiblioByBiblioIdAfterCreate.call_number,
  //     opac_hide: findBiblioByBiblioIdAfterCreate.opac_hide,
  //     collation: findBiblioByBiblioIdAfterCreate.collation,
  //     // image: findBiblioByBiblioIdAfterCreate.image,
  //     input_date: createBiblioDto.input_date,
  //     last_update: createBiblioDto.last_update,
  //   };

  //   await this.searchBiblioService.create(createSearchBiblio);

  //   return objectReturn;
  // }

  async createBiblioAttachment(createBiblioAttachmentDto): Promise<any> {
    // if (createBiblioAttachmentDto['access_limit']) {
    //   var c = new Serialization('');
    //   c.__addAttr__(0, 'integer', '1', 'string');
    //   createBiblioAttachmentDto['access_limit'] = serialize(c, 'array');
    // } else {
    //   createBiblioAttachmentDto['access_limit'] = null;
    // }

    if (createBiblioAttachmentDto['access_limit'].length > 0) {
      var c = new Serialization('');
      for (let iAccesLimit = 0; iAccesLimit < createBiblioAttachmentDto['access_limit'].length; iAccesLimit++) {
        const element = createBiblioAttachmentDto['access_limit'][iAccesLimit];
        c.__addAttr__(iAccesLimit, 'integer', element, 'string');
      }
      createBiblioAttachmentDto['access_limit'] = serialize(c, 'array');
    } else {
      createBiblioAttachmentDto['access_limit'] = null;
    }

    return await this.biblioAttachmentService.create(createBiblioAttachmentDto);
  }

  async updateBiblioAttachment(file_id, updateBiblioAttachmentDto): Promise<any> {
    // if (updateBiblioAttachmentDto['access_limit']) {
    //   var c = new Serialization('');
    //   c.__addAttr__(0, 'integer', '1', 'string');
    //   updateBiblioAttachmentDto['access_limit'] = serialize(c, 'array');
    // } else {
    //   updateBiblioAttachmentDto['access_limit'] = null;
    // }


    if (updateBiblioAttachmentDto['access_limit'].length > 0) {
      var c = new Serialization('');
      for (let iAccesLimit = 0; iAccesLimit < updateBiblioAttachmentDto['access_limit'].length; iAccesLimit++) {
        const element = updateBiblioAttachmentDto['access_limit'][iAccesLimit];
        c.__addAttr__(iAccesLimit, 'integer', element, 'string');
      }
      updateBiblioAttachmentDto['access_limit'] = serialize(c, 'array');
    } else {
      updateBiblioAttachmentDto['access_limit'] = null;
    }

    return await this.biblioAttachmentService.updateOne({ file_id }, updateBiblioAttachmentDto);
  }

  async updateBiblioByBiblioId(
    biblio_id,
    updateBiblioDto: UpdateBiblioDto,
  ): Promise<any> {
    const findBiblioByBiblioId: any = await this.getBiblioById(biblio_id);
    if (findBiblioByBiblioId) {
      if (findBiblioByBiblioId.title != updateBiblioDto.title) {
        const findBiblioByTitle = await this.findOne({
          title: updateBiblioDto.title,
        });
        if (findBiblioByTitle) {
          throw new BadRequestException('Title is exist');
        }
      }
    }

    const updatedBiblio = await this.updateOne({ biblio_id }, updateBiblioDto);
    const findBiblioByBiblioIdAfterUpdate: any = await this.getBiblioById(
      biblio_id,
    );

    const updateSearchBiblio = {
      title: findBiblioByBiblioIdAfterUpdate.title,
      edition: findBiblioByBiblioIdAfterUpdate.edition,
      isbn_issn: findBiblioByBiblioIdAfterUpdate.isbn_issn,
      // author: findBiblioByBiblioIdAfterUpdate.author,
      // topic: findBiblioByBiblioIdAfterUpdate.topic,
      gmd: findBiblioByBiblioIdAfterUpdate.gmd_name,
      publisher: findBiblioByBiblioIdAfterUpdate.publisher_name,
      publish_place: findBiblioByBiblioIdAfterUpdate.place_name,
      language: findBiblioByBiblioIdAfterUpdate.language_name,
      classification: findBiblioByBiblioIdAfterUpdate.classification,
      spec_detail_info: findBiblioByBiblioIdAfterUpdate.spec_detail_info,
      carrier_type: findBiblioByBiblioIdAfterUpdate.carrier_type,
      content_type: findBiblioByBiblioIdAfterUpdate.content_type,
      media_type: findBiblioByBiblioIdAfterUpdate.media_type,
      // location: findBiblioByBiblioIdAfterUpdate.location,
      publish_year: findBiblioByBiblioIdAfterUpdate.publish_year,
      notes: findBiblioByBiblioIdAfterUpdate.notes,
      series_title: findBiblioByBiblioIdAfterUpdate.series_title,
      // items: findBiblioByBiblioIdAfterUpdate.items,
      // collection_types: findBiblioByBiblioIdAfterUpdate.collection_types,
      call_number: findBiblioByBiblioIdAfterUpdate.call_number,
      opac_hide: findBiblioByBiblioIdAfterUpdate.opac_hide,
      collation: findBiblioByBiblioIdAfterUpdate.collation,
      // image: findBiblioByBiblioIdAfterUpdate.image,
      last_update: updateBiblioDto.last_update,
    };

    await this.searchBiblioService.updateOne({ biblio_id }, updateSearchBiblio);

    return findBiblioByBiblioIdAfterUpdate;
  }

  // async updateBiblioAttachment(
  //   file_id,
  //   updateBiblioAttachmentDto,
  // ): Promise<any> {
  //   let updateFile = { ...updateBiblioAttachmentDto };
  //   delete updateFile['placement'];
  //   delete updateFile['access_type'];
  //   delete updateFile['access_limit'];
  //   delete updateFile['biblio_id'];

  //   await this.filesService.updateOne({ file_id }, updateFile);

  //   let updateBiblioAttachment = {
  //     placement: updateBiblioAttachmentDto.placement,
  //     access_type: updateBiblioAttachmentDto.access_type,
  //     access_limit: updateBiblioAttachmentDto.access_limit,
  //   };

  //   if (updateBiblioAttachment['access_limit']) {
  //     var c = new Serialization('');
  //     c.__addAttr__(0, 'integer', '1', 'string');
  //     updateBiblioAttachment['access_limit'] = serialize(c, 'array');
  //   } else {
  //     updateBiblioAttachment['access_limit'] = null;
  //   }

  //   return await this.biblioAttachmentService.updateOne(
  //     {
  //       biblio_id: updateBiblioAttachmentDto.biblio_id,
  //       file_id: file_id,
  //     },
  //     updateBiblioAttachment,
  //   );
  // }

  async deleteBiblio(id: number): Promise<any> {
    let item = await this.itemsService.find({ biblio_id: id })
    if (item.length > 0) {
      throw new BadRequestException(`Can't be deleted because still have ${item.length} copies`);
    }

    await this.biblioRepository.deleteQueryBuilder(Biblio_Attachment, {
      biblio_id: id,
    });
    await this.biblioRepository.deleteQueryBuilder(Biblio_Author, {
      biblio_id: id,
    });
    await this.biblioRepository.deleteQueryBuilder(Biblio_Custom, {
      biblio_id: id,
    });
    // await this.biblioRepository.deleteQueryBuilder(Biblio_Log, { biblio_id: id });
    await this.biblioRepository.deleteQueryBuilder(Biblio_Topic, {
      biblio_id: id,
    });
    await this.biblioRepository.deleteQueryBuilder(Comment, { biblio_id: id });
    await this.biblioRepository.deleteQueryBuilder(Item, { biblio_id: id });
    await this.biblioRepository.deleteQueryBuilder(Loan_History, {
      biblio_id: id,
    });
    await this.biblioRepository.deleteQueryBuilder(Search_Biblio, {
      biblio_id: id,
    });
    await this.biblioRepository.deleteQueryBuilder(Serial, { biblio_id: id });
    await this.biblioRepository.deleteQueryBuilder(Biblio, { biblio_id: id });
    return true;
  }

  async deleteBiblioAuthor(biblio_id, author_id) {
    const author = await this.MSTAuthorsService.findOneWithoutNotFound({
      author_id,
    });

    const searchBiblio = await this.searchBiblioService.findOneWithoutNotFound({
      biblio_id,
    });
    if (searchBiblio?.author) {
      let searchBiblioAuthor: any = searchBiblio.author.split('-');
      searchBiblioAuthor = searchBiblioAuthor.map((s) => s.trim());

      const indexOfAuthorName = searchBiblioAuthor.indexOf(author.author_name);
      if (indexOfAuthorName > -1) {
        searchBiblioAuthor.splice(indexOfAuthorName, 1);
      }
      const updatedSearchBiblio = await this.searchBiblioService.updateOne(
        { biblio_id },
        { author: searchBiblioAuthor.join(' - ') },
      );
    }

    const deletedBiblioAuthorService = await this.biblioAuthorService.delete({
      biblio_id,
      author_id,
    });
    return deletedBiblioAuthorService;
  }

  async deleteBiblioTopic(biblio_id, topic_id) {
    const topic = await this.MSTTopicsService.findOneWithoutNotFound({
      topic_id,
    });

    const searchBiblio = await this.searchBiblioService.findOne({ biblio_id });
    if (searchBiblio?.topic) {
      let searchBiblioTopic: any = searchBiblio.topic.split('-');
      searchBiblioTopic = searchBiblioTopic.map((s) => s.trim());

      const indexOfTopicName = searchBiblioTopic.indexOf(topic.topic);
      if (indexOfTopicName > -1) {
        searchBiblioTopic.splice(indexOfTopicName, 1);
      }
      const updatedSearchBiblio = await this.searchBiblioService.updateOne(
        { biblio_id },
        { topic: searchBiblioTopic.join(' - ') },
      );
    }

    const deletedBibliTopicService = await this.biblioTopicService.delete({
      biblio_id,
      topic_id,
    });
    return deletedBibliTopicService;
  }
}
