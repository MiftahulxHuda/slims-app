import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mst_coll_type')
export class MST_Coll_Type extends BaseEntity {
    @PrimaryGeneratedColumn()
    coll_type_id: string;

    @Column()
    coll_type_name: string;

    @Column({ select: false })
    input_date: string;

    @Column({ select: false })
    last_update: string;
}
