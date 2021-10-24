import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('setting')
export class Setting extends BaseEntity {
    @PrimaryGeneratedColumn()
    setting_id: number;

    @Column()
    setting_name: string;

    @Column()
    setting_value: string;
}
