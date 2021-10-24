import { BaseEntity, Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('biblio_relation')
export class Biblio_Relation extends BaseEntity {
  @PrimaryColumn()
  biblio_id: number;

  @PrimaryColumn()
  rel_biblio_id: number;

  @Column()
  rel_type: number;
}
