import { BaseEntity, Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('loan')
export class Loan extends BaseEntity {
  @PrimaryColumn()
  loan_id: number;

  @Column()
  item_code: string;

  @Column()
  is_return: number;
}