import { BaseEntity, Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('biblio_author')
export class Biblio_Author extends BaseEntity {
  @PrimaryColumn()
  biblio_id: number;

  @PrimaryColumn()
  author_id: number;

  @Column()
  level: number;
}
