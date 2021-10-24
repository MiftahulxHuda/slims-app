import { BaseEntity, Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('search_biblio')
export class Search_Biblio extends BaseEntity {
  @PrimaryColumn()
  biblio_id: number;

  @Column()
  title: string;

  @Column()
  edition: string;

  @Column()
  isbn_issn: string;

  @Column()
  author: string;

  @Column()
  topic: string;

  @Column()
  gmd: string;

  @Column()
  publisher: string;

  @Column()
  publish_place: string;

  @Column()
  language: string;

  @Column()
  classification: string;
  
  @Column()
  spec_detail_info: string;

  @Column()
  carrier_type: string;

  @Column()
  content_type: string;

  @Column()
  media_type: string;

  @Column()
  location: string;

  @Column()
  publish_year: string;

  @Column()
  notes: string;

  @Column()
  series_title: string;

  @Column()
  items: string;

  @Column()
  collection_types: string;

  @Column()
  call_number: string;

  @Column()
  opac_hide: string;

  @Column()
  promoted: string;

  @Column()
  labels: string;

  @Column()
  collation: string;

  @Column()
  image: string;

  @Column({select: false})
  input_date: string;

  @Column({select: false})
  last_update: string;
}
