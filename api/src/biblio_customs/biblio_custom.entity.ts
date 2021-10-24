import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';

@Entity('biblio_custom')
export class Biblio_Custom extends BaseEntity {
  @PrimaryColumn()
  biblio_id: number;
}
