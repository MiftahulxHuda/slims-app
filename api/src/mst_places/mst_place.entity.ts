import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('mst_place')
export class MST_Place extends BaseEntity {
  @PrimaryGeneratedColumn()
  place_id: number;

  @Column()
  place_name: string;

  @Column({ select: false })
  input_date: string;

  @Column({ select: false })
  last_update: string;
}
