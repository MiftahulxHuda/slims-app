import { Controller, Get, UseGuards, Query, ValidationPipe, UsePipes, Post, Body, Param, Put, Delete, UseInterceptors, ParseIntPipe, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery, ApiParam, ApiConsumes } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as mime from 'mime-types';

import { FilesService } from './files.service';
import { Files } from './files.entity';
import { BiblioAttachmentsService } from 'src/biblio_attachments/biblio_attachments.service';
import { CreateFileDto } from './dto/create-file';
import { diskStorage } from 'multer';
import { join } from 'path';
import { create } from 'node:domain';
import { UpdateFileDto } from './dto/update-file';

// @ApiBearerAuth()
@ApiTags('files')
@Controller('files')
// @UseGuards(AuthGuard())
export class FilesController {
    constructor(
        private filesService: FilesService,
        private biblioAttachmentsService: BiblioAttachmentsService,
    ) { }

    @Get(':file_id')
    @ApiParam({ name: 'file_id' })
    getFileByFileId(@Param('file_id') file_id: number): Promise<Files> {
        return this.filesService.findOneWithoutNotFound({ file_id });
    }

    // @Post()
    // @UsePipes(new ValidationPipe({ transform: true }))
    // @ApiConsumes('multipart/form-data')
    // // @UseInterceptors(FileInterceptor('file_name', {
    // //     storage: diskStorage({
    // //         destination: 'C:/xampp/htdocs/slims2/repository',
    // //         filename: (req, file, cb) => {
    // //             function makeid(length) {
    // //                 var result = '';
    // //                 var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    // //                 var charactersLength = characters.length;
    // //                 for (var i = 0; i < length; i++) {
    // //                     result += characters.charAt(Math.floor(Math.random() *
    // //                         charactersLength));
    // //                 }
    // //                 return result;
    // //             }

    // //             if (file) {
    // //                 cb(null, makeid(32) + "." + mime.extension(file.mimetype))
    // //             }
    // //         },
    // //     }),
    // //     limits: {
    // //         fileSize: 5079040
    // //     }
    // // }))
    // createFile(
    //     @Body() createFileDto: CreateFileDto,
    //     // @UploadedFile() file_name
    // )/* : Promise<File> */ {
    //     // if(file_name) {
    //     //     createFileDto['file_name'] = file_name.filename;
    //     //     createFileDto.mime_type = file_name.mimetype;
    //     // }
    //     // return this.filesService.create(createFileDto);
    //     function makeid(length) {
    //         var result = '';
    //         var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //         var charactersLength = characters.length;
    //         for (var i = 0; i < length; i++) {
    //             result += characters.charAt(Math.floor(Math.random() *
    //                 charactersLength));
    //         }
    //         return result;
    //     }
    //     createFileDto.mime_type = createFileDto['file_name'];
    //     createFileDto['file_name'] = makeid(32) + "." + mime.extension(createFileDto['file_name'])

    //     return this.filesService.create(createFileDto);
    // }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file_name', {
        storage: diskStorage({
            destination: 'C:/xampp/htdocs/slims2/repository',
            filename: (req, file, cb) => {
                function makeid(length) {
                    var result = '';
                    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                    var charactersLength = characters.length;
                    for (var i = 0; i < length; i++) {
                        result += characters.charAt(Math.floor(Math.random() *
                            charactersLength));
                    }
                    return result;
                }

                if (file) {
                    cb(null, makeid(32) + "." + mime.extension(file.mimetype))
                }
            },
        }),
        limits: {
            fileSize: 41943040
        }
    }))
    createFile(
        @Body() createFileDto: CreateFileDto,
        @UploadedFile() file_name
    ): Promise<File> {
        if(file_name) {
            createFileDto['file_name'] = file_name.filename;
            createFileDto.mime_type = file_name.mimetype;
        }
        return this.filesService.create(createFileDto);
    }


    @Put(':file_id')
    @UsePipes(new ValidationPipe({ transform: true }))
    updateFileByFileId(
        @Param('file_id') file_id: number,
        @Body() updateFileDto: UpdateFileDto,
    ): Promise<any> {
        return this.filesService.updateOne({ file_id }, updateFileDto);
    }
}