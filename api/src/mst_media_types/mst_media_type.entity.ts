import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('mst_media_type')
export class MST_Media_Type extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    media_type: string;

    @Column()
    code: string;

    @Column()
    code2: string;

    @Column({ select: false })
    input_date: string;

    @Column({ select: false })
    last_update: string;
}
