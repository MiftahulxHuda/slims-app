import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('files')
export class Files extends BaseEntity {
    @PrimaryGeneratedColumn()
    file_id: number;

    @Column()
    file_title: string;

    @Column()
    file_name: string;

    @Column()
    file_url: string;

    @Column({ select: false })
    file_dir: string;

    @Column()
    mime_type: string;

    @Column()
    file_desc: string;

    @Column({ select: false })
    uploader_id: number;

    @Column({ select: false })
    input_date: string;

    @Column({ select: false })
    last_update: string;
}
