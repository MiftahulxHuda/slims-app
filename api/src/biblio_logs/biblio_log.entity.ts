import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('biblio_log')
export class Biblio_Log extends BaseEntity {
  @PrimaryGeneratedColumn()
  biblio_log_id: number;

  @Column()
  biblio_id: number;

  @Column()
  user_id: number;

  @Column()
  realname: string;

  @Column()
  title: string;

  @Column()
  ip: string;

  @Column()
  action: string;

  @Column()
  affectedrow: string;

  @Column()
  rawdata: string;

  @Column()
  additional_information: string;

  @Column()
  date: string;
}
