import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DbGenService } from 'src/utils/DbGenService';
import { MST_Member_Type } from './mst_member_type.entity';
import { MSTMemberTypeRepository } from './mst_member_type.repository';

@Injectable()
export class MSTMemberTypeService extends DbGenService<MST_Member_Type>  {
    constructor(
        @InjectRepository(MSTMemberTypeRepository)
        private mstMemberTypeRepository: MSTMemberTypeRepository,
    ) {
        super(mstMemberTypeRepository);
    }
}