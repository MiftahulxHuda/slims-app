import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class SortPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        const { type } = metadata;
        
        // Make sure to only run your logic on queries
        if (type === 'query') return this.transformQuery(value);

        return value;
    }

    transformQuery(query: any) {
        if (typeof query !== 'object' || !query) return query;

        const { sort } = query;
        if (sort) query.sort = this.convertSort(sort);

        return query;
    }

    convertSort(sort) {
        let arrSort = sort.split(',');
        let objSort = {};

        for (let index = 0; index < arrSort.length; index++) {
            let elArrSort = arrSort[index];
            if(elArrSort.indexOf("-") == -1) {
                objSort[elArrSort] = "ASC"
            } else {
                elArrSort = elArrSort.replace('-', '')
                objSort[elArrSort] = "DESC"
            }
        }

        return objSort;
    }
}