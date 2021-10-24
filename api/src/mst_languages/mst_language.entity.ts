import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('mst_language')
export class MST_Language extends BaseEntity {
  @PrimaryGeneratedColumn()
  language_id: number;

  @Column()
  language_name: string;

  @Column({ select: false })
  input_date: string;

  @Column({ select: false })
  last_update: string;
}
