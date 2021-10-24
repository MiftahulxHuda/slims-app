import { BaseEntity, Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('loan_history')
export class Loan_History extends BaseEntity {
    @PrimaryColumn()
    loan_id: number;

    @Column()
    item_code: string;

    @Column()
    biblio_id: number;

    @Column()
    title: string;

    @Column()
    call_number: string;

    @Column()
    classification: string;

    @Column()
    gmd_name: string;

    @Column()
    language_name: string;

    @Column()
    location_name: string;
    
    @Column()
    collection_type_name: string;

    @Column()
    member_id: string;

    @Column()
    member_name: string;

    @Column()
    member_type_name: string;

    @Column()
    loan_date: string;

    @Column()
    due_date: string;

    @Column()
    renewed: number;

    @Column()
    is_lent: number;

    @Column()
    is_return: number;

    @Column()
    return_date: string;

    @Column()
    input_date: string;

    @Column()
    last_update: string;
}