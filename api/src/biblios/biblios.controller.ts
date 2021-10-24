import {
  Controller,
  Get,
  UseGuards,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Delete,
  UseInterceptors,
  UploadedFile,
  UsePipes,
  ValidationPipe,
  Query,
  Put,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import * as fs from 'fs';
import { join } from 'path';
import * as mime from 'mime-types';

import { BibliosService } from './biblios.service';
import { Biblio } from './biblio.entity';
import { CreateBiblioDto } from './dto/create-biblio.dto';
import { diskStorage } from 'multer';
import { SortPipe } from 'src/utils/SortPipe.pipe';
import { GetBiblioFilterDto } from './dto/get-biblio-filter.dto';
import { SearchBibliosService } from 'src/search_biblios/search_biblios.service';
import { Like } from 'typeorm';
import { BiblioAuthorsService } from 'src/biblio_authors/biblio_authors.service';
import { BiblioTopicsService } from 'src/biblio_topics/biblio_topics.service';
import { BiblioAttachmentsService } from 'src/biblio_attachments/biblio_attachments.service';
import { UpdateBiblioDto } from './dto/update-biblio.dto';
import { BiblioRelationsService } from 'src/biblio_relations/biblio_relations.service';
import { CreateBiblioRelationByBiblioIdDto, CreateBiblioRelationDto } from './dto/create-biblio-relation.dto';
import { FilesService } from 'src/files/files.service';
import { UploadCoverDTO } from './dto/upload-cover.dto';
import { CreateBiblioAuthorByBiblioIdDto, CreateBiblioAuthorDto } from './dto/create-biblio-author.dto';
import { CreateBiblioTopicByBiblioIdDto, CreateBiblioTopicDto } from './dto/create-biblio-topic.dto';
import { CreateBiblioAttachmentByBiblioIdDto, CreateBiblioAttachmentDto } from './dto/create-biblio-attachment.dto';
import { CreateSearchBiblioDto } from './dto/create-search-biblio.dto';

// @ApiBearerAuth()
@ApiTags('biblio')
@Controller('biblio')
// @UseGuards(AuthGuard())
export class BibliosController {
  constructor(
    private bibliosService: BibliosService,
    private biblioAuthorService: BiblioAuthorsService,
    private biblioTopicService: BiblioTopicsService,
    private biblioAttachmentService: BiblioAttachmentsService,
    private biblioRelationService: BiblioRelationsService,
    private searchBibliosService: SearchBibliosService,
    private filesService: FilesService,
  ) { }

  @Get()
  @ApiQuery({ name: 'take', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'sort', required: false })
  @ApiQuery({ name: 'title', required: false })
  @ApiQuery({ name: 'author', required: false })
  @ApiQuery({ name: 'isbn_issn', required: false })
  @ApiQuery({ name: 'publisher', required: false })
  @UsePipes(new SortPipe())
  getBiblios(
    @Query() filterDto: GetBiblioFilterDto,
    @Query('take') take: number,
    @Query('skip') skip: number,
  ): Promise<Biblio[]> {
    delete filterDto['take'];
    delete filterDto['skip'];

    const sort = filterDto.sort;

    let filter = {};

    if (filterDto.title) {
      filter['title'] = Like(`%${filterDto.title}%`);
    }
    if (filterDto.author) {
      filter['author'] = Like(`%${filterDto.author}%`);
    }
    if (filterDto.isbn_issn) {
      filter['isbn_issn'] = Like(`%${filterDto.isbn_issn}%`);
    }
    if (filterDto.publisher) {
      filter['publisher'] = Like(`%${filterDto.publisher}%`);
    }

    return this.searchBibliosService.findAll(filter, sort, {
      take: take,
      skip: skip,
    });
  }

  @Get('/biblio_author/:biblio_id')
  getBiblioAuthorByBiblioId(
    @Param('biblio_id', ParseIntPipe) biblio_id: number,
  ): Promise<any> {
    return this.biblioAuthorService.getBiblioAuthorsByBiblioId(biblio_id);
  }

  @Get('/biblio_topic/:biblio_id')
  getBiblioTopicByBiblioId(
    @Param('biblio_id', ParseIntPipe) biblio_id: number,
  ): Promise<any> {
    return this.biblioTopicService.getBiblioTopicsByBiblioId(biblio_id);
  }

  @Get('/biblio_attachment/:biblio_id')
  getBiblioAttachmentByBiblioId(
    @Param('biblio_id', ParseIntPipe) biblio_id: number,
  ): Promise<any> {
    return this.biblioAttachmentService.getBiblioAttachmentsByBiblioId(
      biblio_id,
    );
  }

  @Get('/biblio_relation/:biblio_id')
  getBiblioRelationByBiblioId(
    @Param('biblio_id', ParseIntPipe) biblio_id: number,
  ): Promise<any> {
    return this.biblioRelationService.getBiblioRelationsByBiblioId(biblio_id);
  }

  @Get('/:biblio_id')
  getBiblioById(
    @Param('biblio_id', ParseIntPipe) biblio_id: number,
  ): Promise<Biblio> {
    return this.bibliosService.getBiblioById(biblio_id);
  }

  @Post('biblio_author/:biblio_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiBody({ type: [CreateBiblioAuthorByBiblioIdDto] })
  createBiblioAuthorByBiblioId(
    @Param('biblio_id') biblio_id: number,
    @Body() createBiblioAuthorDto: CreateBiblioAuthorByBiblioIdDto[],
  ): Promise<any> {
    return this.biblioAuthorService.createBiblioAuthorByBiblioId(biblio_id, createBiblioAuthorDto);
  }

  @Post('biblio_author')
  @UsePipes(new ValidationPipe({ transform: true }))
  createBiblioAuthor(
    @Body() createBiblioAuthorDto: CreateBiblioAuthorDto,
  ): Promise<any> {
    return this.biblioAuthorService.createBiblioAuthor(createBiblioAuthorDto);
  }

  @Post('biblio_topic')
  @UsePipes(new ValidationPipe({ transform: true }))
  createBiblioTopic(
    @Body() createBiblioTopicDto: CreateBiblioTopicDto,
  ): Promise<any> {
    return this.biblioTopicService.createBiblioTopic(createBiblioTopicDto);
  }

  @Post('biblio_topic/:biblio_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiBody({ type: [CreateBiblioTopicByBiblioIdDto] })
  createBiblioTopicByBiblioId(
    @Param('biblio_id') biblio_id: number,
    @Body() createBiblioTopicDto: CreateBiblioTopicByBiblioIdDto[],
  ): Promise<any> {
    return this.biblioTopicService.createBiblioTopicByBiblioIdDto(biblio_id, createBiblioTopicDto);
  }

  @Post('biblio_attachment/:biblio_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiBody({ type: [CreateBiblioAttachmentByBiblioIdDto] })
  createBiblioAttachmentByBiblioId(
    @Param('biblio_id') biblio_id: number,
    @Body() createBiblioAttachmentDto: CreateBiblioAttachmentByBiblioIdDto[],
  ): Promise<any> {
    return this.biblioAttachmentService.createBiblioAttachmentByBiblioIdDto(biblio_id, createBiblioAttachmentDto);
  }

  @Post('biblio_attachment')
  @UsePipes(new ValidationPipe({ transform: true }))
  createBiblioAttachment(
    @Body() createBiblioAttachmentDto: CreateBiblioAttachmentDto,
  ): Promise<any> {
    return this.bibliosService.createBiblioAttachment(
      createBiblioAttachmentDto,
    );
  }

  // for first create bibliography
  @Post('biblio_relation/:biblio_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiBody({ type: [CreateBiblioRelationByBiblioIdDto] })
  createBiblioRelationByBiblioId(
    @Param('biblio_id') biblio_id: number,
    @Body() createBiblioRelationDto: CreateBiblioRelationByBiblioIdDto[],
  ): Promise<any> {
    return this.biblioRelationService.createBiblioRelationByBiblioIdDto(biblio_id, createBiblioRelationDto);
  }

  @Post('biblio_relation')
  @UsePipes(new ValidationPipe({ transform: true }))
  createBiblioRelation(
    @Body() createBiblioRelationDto: CreateBiblioRelationDto,
  ): Promise<any> {
    return this.biblioRelationService.createBiblioRelation(
      createBiblioRelationDto,
    );
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createBiblio(@Body() createBiblioDto: CreateBiblioDto): Promise<any> {
    return this.bibliosService.createBiblio(createBiblioDto);
  }

  @Post('upload_cover/:biblio_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'C:/xampp/htdocs/slims2/images/docs',
        filename: (req, file, cb) => {
          if (file) {
            let fileName = file.originalname;
            const extension = mime.extension(file.mimetype);
            fileName = fileName.replace(extension, "");

            if (
              fs.existsSync(
                join(
                  __dirname,
                  '../../../slims2/images/docs/' + fileName + "." + extension,
                ),
              )
            ) {
              cb(null, fileName + Date.now() + "." + extension);
            } else {
              cb(null, fileName + "." + extension);
            }
          }
        },
      }),
      limits: {
        fileSize: 512000
      }
    }),
  )
  async uploadImage(
    @Param('biblio_id', ParseIntPipe) biblio_id: number,
    @Body() uploadCover: UploadCoverDTO,
    @UploadedFile() image,
  ): Promise<any> {
    let uploadImage = {};
    if (image) {
      uploadImage['image'] = image.filename;
    }

    await this.bibliosService.updateOne(biblio_id, uploadImage);
    return await this.searchBibliosService.updateOne(biblio_id, uploadImage);
  }

  @Put('biblio_attachment/:file_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateFileByFileId(
    @Param('file_id') file_id: number,
    @Body() updateBiblioAttachmentDto: CreateBiblioAttachmentDto,
  ): Promise<any> {
    return this.bibliosService.updateBiblioAttachment(
      file_id,
      updateBiblioAttachmentDto,
    );
  }

  @Put(':biblio_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateBiblioByBiblioId(
    @Param('biblio_id') biblio_id: number,
    @Body() updateBiblioDto: UpdateBiblioDto,
  ): Promise<any> {
    return this.bibliosService.updateBiblioByBiblioId(
      biblio_id,
      updateBiblioDto,
    );
  }

  @Delete('remove_cover/:biblio_id')
  async deleteImage(@Param('biblio_id') biblio_id: number): Promise<any> {
    const biblio: any = await this.bibliosService.findOneWithoutNotFound({
      biblio_id,
    });
    if (
      fs.existsSync(
        join(__dirname, '../../../slims2/images/docs/' + biblio.image),
      )
    ) {
      await fs.unlinkSync(
        join(__dirname, '../../../slims2/images/docs/' + biblio.image),
      );
    }

    await this.bibliosService.updateOne({ biblio_id }, { image: null });
    await this.searchBibliosService.updateOne(
      { biblio_id },
      { image: null },
    );

    return null;
  }

  @Delete('biblio_author')
  @ApiQuery({ name: 'biblio_id' })
  @ApiQuery({ name: 'author_id' })
  async deleteBiblioAuthorByBiblioId(
    @Query('biblio_id') biblio_id: number,
    @Query('author_id') author_id: number,
  ): Promise<any> {
    await this.bibliosService.deleteBiblioAuthor(biblio_id, author_id);
    return null
  }

  @Delete('biblio_topic')
  @ApiQuery({ name: 'biblio_id' })
  @ApiQuery({ name: 'topic_id' })
  async deleteBiblioTopicByBiblioId(
    @Query('biblio_id') biblio_id: number,
    @Query('topic_id') topic_id: number,
  ): Promise<any> {
    await this.bibliosService.deleteBiblioTopic(biblio_id, topic_id);
    return null
  }

  @Delete('biblio_relation')
  @ApiQuery({ name: 'biblio_id' })
  @ApiQuery({ name: 'rel_biblio_id' })
  deleteBiblioRelationByBiblioId(
    @Query('biblio_id') biblio_id: number,
    @Query('rel_biblio_id') rel_biblio_id: number,
  ): Promise<any> {
    return this.biblioRelationService.deleteOne({ biblio_id, rel_biblio_id });
  }

  @Delete('biblio_attachment')
  @ApiQuery({ name: 'biblio_id' })
  @ApiQuery({ name: 'file_id' })
  async deleteBiblioAttachmentByBiblioId(
    @Query('biblio_id') biblio_id: number,
    @Query('file_id') file_id: number,
  ): Promise<any> {
    const file: any = await this.filesService.findOneWithoutNotFound({ file_id });
    if (
      fs.existsSync(
        join(
          __dirname,
          '../../../slims2/repository/' + file.file_name,
        ),
      )
    ) {
      await fs.unlinkSync(
        join(__dirname, '../../../slims2/repository/' + file.file_name),
      );
    }
    return this.biblioAttachmentService.deleteOne({ biblio_id, file_id });
  }

  @Delete(':biblio_id')
  deleteBiblio(
    @Param('biblio_id', ParseIntPipe) biblio_id: number,
  ): Promise<any> {
    return this.bibliosService.deleteBiblio(biblio_id);
  }

  @Post('search_biblio/:biblio_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createSearchBiblio(
    @Param('biblio_id', ParseIntPipe) biblio_id: number,
    @Body() createSearchBiblioDTO: CreateSearchBiblioDto,
  )/* : Promise<any> */ {
    const biblio: any = await this.bibliosService.getBiblioById(biblio_id);

    const createSearchBiblio: any = {
      biblio_id: biblio.biblio_id,
      title: biblio.title,
      edition: biblio.edition,
      isbn_issn: biblio.isbn_issn,
      gmd: biblio.gmd_name,
      publisher: biblio.publisher_name,
      publish_place: biblio.place_name,
      language: biblio.language_name,
      classification: biblio.classification,
      spec_detail_info: biblio.spec_detail_info,
      carrier_type: biblio.carrier_type
        ? biblio.carrier_type
        : '',
      content_type: biblio.content_type
        ? biblio.content_type
        : '',
      media_type: biblio.media_type
        ? biblio.media_type
        : '',
      // location: biblio.location,
      publish_year: biblio.publish_year,
      notes: biblio.notes,
      series_title: biblio.series_title,
      // items: biblio.items,
      // collection_types: biblio.collection_types,
      call_number: biblio.call_number,
      opac_hide: biblio.opac_hide,
      collation: biblio.collation,
      // image: biblio.image,
      // input_date: createBiblioDto.input_date,
      // last_update: createBiblioDto.last_update,
    };

    if (createSearchBiblioDTO.author.length > 0) {
      createSearchBiblio["author"] = createSearchBiblioDTO.author
    }

    if (createSearchBiblioDTO.topic.length > 0) {
      createSearchBiblio["topic"] = createSearchBiblioDTO.topic
    }

    if (createSearchBiblioDTO.location.length > 0) {
      createSearchBiblio["location"] = createSearchBiblioDTO.location
    }

    if (createSearchBiblioDTO.collection_types.length > 0) {
      createSearchBiblio["collection_types"] = createSearchBiblioDTO.collection_types
    }

    if (createSearchBiblioDTO.items.length > 0) {
      createSearchBiblio["items"] = createSearchBiblioDTO.items
    }

    return await this.searchBibliosService.create(createSearchBiblio);
  }

  @Put('search_biblio/:biblio_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateSearchBiblio(
    @Param('biblio_id', ParseIntPipe) biblio_id: number,
    @Body() updateSearchBiblioDTO: CreateSearchBiblioDto,
  )/* : Promise<any> */ {
    const biblio: any = await this.bibliosService.getBiblioById(biblio_id);

    const updateSearchBiblio: any = {
      biblio_id: biblio.biblio_id,
      title: biblio.title,
      edition: biblio.edition,
      isbn_issn: biblio.isbn_issn,
      gmd: biblio.gmd_name,
      publisher: biblio.publisher_name,
      publish_place: biblio.place_name,
      language: biblio.language_name,
      classification: biblio.classification,
      spec_detail_info: biblio.spec_detail_info,
      carrier_type: biblio.carrier_type
        ? biblio.carrier_type
        : '',
      content_type: biblio.content_type
        ? biblio.content_type
        : '',
      media_type: biblio.media_type
        ? biblio.media_type
        : '',
      // location: biblio.location,
      publish_year: biblio.publish_year,
      notes: biblio.notes,
      series_title: biblio.series_title,
      // items: biblio.items,
      // collection_types: biblio.collection_types,
      call_number: biblio.call_number,
      opac_hide: biblio.opac_hide,
      collation: biblio.collation,
      // image: biblio.image,
      // input_date: createBiblioDto.input_date,
      // last_update: createBiblioDto.last_update,
    };

    if (updateSearchBiblioDTO.author.length > 0) {
      updateSearchBiblio["author"] = updateSearchBiblioDTO.author
    } else {
      updateSearchBiblio["author"] = null
    }

    if (updateSearchBiblioDTO.topic.length > 0) {
      updateSearchBiblio["topic"] = updateSearchBiblioDTO.topic
    } else {
      updateSearchBiblio["topic"] = null
    }

    if (updateSearchBiblioDTO.location.length > 0) {
      updateSearchBiblio["location"] = updateSearchBiblioDTO.location
    } else {
      updateSearchBiblio["location"] = null
    }

    if (updateSearchBiblioDTO.collection_types.length > 0) {
      updateSearchBiblio["collection_types"] = updateSearchBiblioDTO.collection_types
    } else {
      updateSearchBiblio["collection_types"] = null
    }

    if (updateSearchBiblioDTO.items.length > 0) {
      updateSearchBiblio["items"] = updateSearchBiblioDTO.items
    } else {
      updateSearchBiblio["items"] = null
    }

    return await this.searchBibliosService.updateOne(biblio_id, updateSearchBiblio);
  }
}
