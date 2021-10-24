import { BaseEntity, Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('biblio_topic')
export class Biblio_Topic extends BaseEntity {
  @PrimaryColumn()
  biblio_id: number;

  @PrimaryColumn()
  topic_id: number;

  @Column()
  level: number;
}
