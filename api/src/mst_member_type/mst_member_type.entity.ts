import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('mst_member_type')
export class MST_Member_Type extends BaseEntity {
    @PrimaryGeneratedColumn()
    member_type_id: number;

    @Column()
    member_type_name: string;
}
