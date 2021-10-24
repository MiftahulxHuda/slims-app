import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mst_supplier')
export class MST_Supplier extends BaseEntity {
    @PrimaryGeneratedColumn()
    supplier_id: string;

    @Column()
    supplier_name: string;

    @Column()
    address: string;

    @Column()
    postal_code: string;

    @Column()
    phone: string;

    @Column()
    contact: string;

    @Column()
    fax: string;

    @Column()
    account: string;

    @Column()
    e_mail: string;

    @Column({ select: false })
    input_date: string;

    @Column({ select: false })
    last_update: string;
}
