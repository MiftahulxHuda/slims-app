import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('biblio')
export class Biblio extends BaseEntity {
  @PrimaryGeneratedColumn()
  biblio_id: number;

  @Column()
  gmd_id: number;

  @Column()
  title: string;

  @Column()
  sor: string;

  @Column()
  edition: string;

  @Column()
  isbn_issn: string;

  @Column()
  publisher_id: number;

  @Column()
  publish_year: string;

  @Column()
  collation: string;

  @Column()
  series_title: string;

  @Column()
  call_number: string;

  @Column()
  language_id: string;

  @Column()
  source: string;

  @Column()
  publish_place_id: number;

  @Column()
  classification: string;

  @Column()
  notes: string;

  @Column()
  image: string;

  @Column()
  file_att: string;

  @Column()
  opac_hide: number;

  @Column()
  promoted: number;

  @Column()
  labels: string;

  @Column()
  frequency_id: number;

  @Column()
  spec_detail_info: string;

  @Column()
  content_type_id: number;

  @Column()
  media_type_id: number;

  @Column()
  carrier_type_id: number;

  @Column({ select: false })
  input_date: string;

  @Column({ select: false })
  last_update: string;

  @Column()
  uid: number;
}
