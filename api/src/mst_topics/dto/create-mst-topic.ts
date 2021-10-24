import { IsIn, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CustomDate } from 'src/utils/custom-date';
import { TopicType } from '../mst_topic.entity';

export class CreateMSTTopicDto {
    @ApiProperty()
    @IsNotEmpty()
    topic: string;

    @ApiProperty({ enum: ['t', 'g', 'n', 'tm', 'gr', 'oc'] })
    @IsIn([TopicType.GENRE, TopicType.GEOGRAPHIC, TopicType.NAME, 
        TopicType.OCCUPATION, TopicType.TEMPORAL, TopicType.TOPIC])
    topic_type: TopicType;

    @ApiProperty()
    auth_list: string = null;
    
    input_date: string = new CustomDate().getDate();

    last_update: string = new CustomDate().getDate();
}