import { EntityRepository, Repository, Like } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { Biblio_Attachment } from './biblio_attachment.entity';

@EntityRepository(Biblio_Attachment)
export class BiblioAttachmentRepository extends Repository<Biblio_Attachment> {
    async getBiblioAttachmentsByBiblioId(biblio_id: number): Promise<Biblio_Attachment[]> {
        try {
            const query = await this.query(`
                SELECT biblio_attachment.*, files.file_title as file_title, files.file_desc as file_desc
                FROM biblio_attachment
                RIGHT JOIN files
                ON biblio_attachment.file_id = files.file_id
                WHERE biblio_attachment.biblio_id = ${biblio_id}
            `)

            return query
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}