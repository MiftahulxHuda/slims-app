import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ItemRepository } from './item.repository';
import { Item } from './item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { DbGenService } from 'src/utils/DbGenService';
import { CustomDate } from 'src/utils/custom-date';
import { BibliosService } from 'src/biblios/biblios.service';

@Injectable()
export class ItemsService extends DbGenService<Item> {
    constructor(
        @InjectRepository(ItemRepository)
        private itemRepository: ItemRepository,
        @Inject(forwardRef(() => BibliosService))
        private bibliosService: BibliosService,
    ) {
        super(itemRepository);
    }

    formatStringToDate(dateString) {
        if (dateString) {
            let dateParts = dateString.split("/");
            let date = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
            return date
        }

        return null;
    }

    async getItemByItemCode(item_id, item_code) {
        if (item_id) {
            const item: any = await this.findOne({ item_id });
            if (item) {
                if (item.item_code != item_code) {
                    return await this.findOne({ item_code });
                } else {
                    return null;
                }
            }
        } else {
            return await this.findOne({ item_code });
        }
    }

    async getItemByBiblioId(biblio_id) {
        const item: any = await this.itemRepository.getItemByBiblioId(biblio_id);
        return item;
    }

    async createItem(createItemDto): Promise<any> {
        const findBiblioByBiblioId = await this.bibliosService.findOneWithoutNotFound({ biblio_id: createItemDto.biblio_id });

        const findItemByItemCode = await this.findOne({ item_code: createItemDto.item_code });
        if (findItemByItemCode) {
            throw new BadRequestException('Item Code is exist');
        }

        createItemDto['call_number'] = null;
        createItemDto['order_date'] = this.formatStringToDate(createItemDto.order_date)
        createItemDto['received_date'] = this.formatStringToDate(createItemDto.received_date)
        createItemDto['invoice_date'] = this.formatStringToDate(createItemDto.invoice_date)

        return await this.create(createItemDto);
    }

    async updateItem(item_id, updateItemDto): Promise<any> {
        const findItem = await this.findOne({ item_code: updateItemDto.item_code });
        if (findItem) {
            if (findItem.item_code != findItem.item_code) {
                const findItemByItemCode = await this.findOne({ item_code: findItem.item_code });
                if (findItemByItemCode) {
                    throw new BadRequestException('Item Code is exist');
                }
            }
        }

        updateItemDto['order_date'] = this.formatStringToDate(updateItemDto.order_date)
        updateItemDto['received_date'] = this.formatStringToDate(updateItemDto.received_date)
        updateItemDto['invoice_date'] = this.formatStringToDate(updateItemDto.invoice_date)
        updateItemDto['last_update'] = new CustomDate().getDateTime()

        return await this.updateOne(item_id, updateItemDto);
    }

    async createItemByBiblioId(biblio_id, createItemDto): Promise<any> {
        const findBiblioByBiblioId = await this.bibliosService.findOneWithoutNotFound({ biblio_id: biblio_id });

        for (let index = 0; index < createItemDto.length; index++) {
            const element = createItemDto[index];
            element['biblio_id'] = biblio_id;
            element['call_number'] = null;
            element['order_date'] = this.formatStringToDate(element.order_date)
            element['received_date'] = this.formatStringToDate(element.received_date)
            element['invoice_date'] = this.formatStringToDate(element.invoice_date)
            element['input_date'] = new CustomDate().getDateTime()
            element['last_update'] = new CustomDate().getDateTime()
            await this.create(element);
        }

        return createItemDto;
    }

    async deleteItem(item_id) {
        const findItem = await this.findOneWithoutNotFound({ item_id });
        const loan = await this.itemRepository.getLoanWhereNotReturnByItemCode(findItem.item_code);
        if (loan.length > 0) {
            throw new BadRequestException("Item code can't be deleted because still on hold by members");
        }

        return await this.deleteOne(item_id)
    }
}