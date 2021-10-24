import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { Biblio } from 'src/biblios/biblio.entity';

@Entity('mst_content_type')
export class MST_Content_Type extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content_type: string;

    @Column()
    code: string;

    @Column()
    code2: string;

    @Column({ select: false })
    input_date: string;

    @Column({ select: false })
    last_update: string;
}
