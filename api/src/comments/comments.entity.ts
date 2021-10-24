import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comment')
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    comment_id: number;

    @Column()
    biblio_id: number;

    @Column()
    member_id: string;

    @Column()
    comment: string;

    @Column()
    input_date: string;

    @Column()
    last_update: string;
}
