import { InternalServerErrorException } from '@nestjs/common';
import { Loan } from 'src/loan/loan.entity';
import { EntityRepository, Repository, Like, getManager } from 'typeorm';

import { Item } from './item.entity';

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
    async getItemByBiblioId(biblio_id: number): Promise<Item[]> {
        try {
            const query = await this.query(`
                SELECT item.*, DATE_FORMAT(item.order_date, '%d/%m/%Y') AS order_date,
                DATE_FORMAT(item.received_date, '%d/%m/%Y') AS received_date,
                DATE_FORMAT(item.invoice_date, '%d/%m/%Y') AS invoice_date,
                mst_supplier.supplier_id AS supplier_id,
                mst_item_status.item_status_id AS item_status_id,
                mst_location.location_id AS location_id,
                mst_coll_type.coll_type_id AS coll_type_id,
                mst_location.location_name as location_name, mst_coll_type.coll_type_name as coll_type_name,
                mst_supplier.supplier_name as supplier_name, mst_item_status.item_status_name as item_status_name
                FROM item
                LEFT JOIN mst_supplier
                    ON item.supplier_id = mst_supplier.supplier_id
                LEFT JOIN mst_item_status
                    ON item.item_status_id = mst_item_status.item_status_id
                LEFT JOIN mst_location
                    ON item.location_id = mst_location.location_id
                LEFT JOIN mst_coll_type
                    ON item.coll_type_id = mst_coll_type.coll_type_id
                WHERE item.biblio_id = ${biblio_id}
                ORDER BY item.item_id
            `)

            return query
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async getLoanWhereNotReturnByItemCode(item_code) {
        try {
            const loan = await getManager()
                .createQueryBuilder(Loan, 'loan')
                   .where('loan.item_code = :item_code', { item_code: item_code })
                   .andWhere('loan.is_return = :is_return', { is_return: 0 })
                .getMany();
            return loan;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}