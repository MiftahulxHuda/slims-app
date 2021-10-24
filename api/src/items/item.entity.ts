import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('item')
export class Item extends BaseEntity {
    @PrimaryGeneratedColumn()
    item_id: number;

    @Column()
    biblio_id: number;

    @Column()
    call_number: string;

    @Column()
    coll_type_id: number;

    @Column()
    item_code: string;

    @Column()
    inventory_code: string;

    @Column()
    received_date: string;

    @Column()
    supplier_id: string;

    @Column()
    order_no: string;

    @Column()
    location_id: string;

    @Column()
    order_date: Date;

    @Column()
    item_status_id: string;

    @Column()
    site: string;

    @Column()
    source: number;

    @Column()
    invoice: string;

    @Column()
    price: number;

    @Column()
    price_currency: string;

    @Column()
    invoice_date: string;

    @Column({ select: false })
    input_date: string;

    @Column({ select: false })
    last_update: string;

    @Column({ select: false })
    uid: number;
}
