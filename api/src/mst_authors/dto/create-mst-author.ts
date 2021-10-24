import { IsIn, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CustomDate } from 'src/utils/custom-date';
import { AuthorityType } from '../mst_author.entity';

export class CreateMSTAuthorDto {
    @ApiProperty()
    @IsNotEmpty()
    author_name: string;

    @ApiProperty()
    author_year: string;

    @ApiProperty({ enum: ['p', 'o', 'c'] })
    @IsIn([AuthorityType.CONFERENCE, AuthorityType.ORGANIZATIONAL_BODY, AuthorityType.PERSONAL_NAME])
    authority_type: AuthorityType;

    @ApiProperty()
    auth_list: string;

    input_date: string = new CustomDate().getDate();

    last_update: string = new CustomDate().getDate();
}