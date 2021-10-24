import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('mst_publisher')
export class MST_Publisher extends BaseEntity {
  @PrimaryGeneratedColumn()
  publisher_id: number;

  @Column()
  publisher_name: string;

  @Column({ select: false })
  input_date: string;

  @Column({ select: false })
  last_update: string;
}
