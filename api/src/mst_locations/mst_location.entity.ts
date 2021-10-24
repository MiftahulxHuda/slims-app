import { BaseEntity, Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('mst_location')
export class MST_Location extends BaseEntity {
    @PrimaryColumn()
    location_id: string;

    @Column()
    location_name: string;

    @Column({ select: false })
    input_date: string;

    @Column({ select: false })
    last_update: string;
}
