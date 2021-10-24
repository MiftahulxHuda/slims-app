import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum TimeUnit {
    DAY = "day",
    WEEK = "week",
    MONTH = "month",
    YEAR = "year"
}

@Entity('mst_frequency')
export class MST_Frequency extends BaseEntity {
    @PrimaryGeneratedColumn()
    frequency_id: number;

    @Column()
    frequency: string;

    @Column()
    language_prefix: string;

    @Column()
    time_increment: number;

    @Column({
        type: "enum",
        enum: TimeUnit,
        default: TimeUnit.DAY
    })
    time_unit: TimeUnit;

    @Column({ select: false })
    input_date: string;

    @Column({ select: false })
    last_update: string;
}
