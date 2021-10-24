import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('serial')
export class Serial extends BaseEntity {
  @PrimaryGeneratedColumn()
  serial_id: number;

  @Column()
  date_start: string;

  @Column()
  date_end: string;

  @Column()
  period: string;

  @Column()
  notes: string;

  @Column()
  biblio_id: number;

  @Column()
  gmd_id: number;

  @Column()
  input_date: string;

  @Column()
  last_update: string;
}
