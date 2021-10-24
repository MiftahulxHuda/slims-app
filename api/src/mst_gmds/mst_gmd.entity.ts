import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('mst_gmd')
export class MST_GMD extends BaseEntity {
  @PrimaryGeneratedColumn()
  gmd_id: number;

  @Column()
  gmd_code: string;

  @Column()
  gmd_name: string;

  @Column()
  icon_image: string;

  @Column({ select: false })
  input_date: string;

  @Column({ select: false })
  last_update: string;
}
