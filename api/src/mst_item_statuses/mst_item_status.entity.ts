import { BaseEntity, Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('mst_item_status')
export class MST_Item_Status extends BaseEntity {
    @PrimaryColumn()
    item_status_id: string;

    @Column()
    item_status_name: string;

    @Column({ select: false })
    rules: string;

    @Column()
    no_loan: string;

    @Column()
    skip_stock_take: string;

    @Column({ select: false })
    input_date: string;

    @Column({ select: false })
    last_update: string;
}
