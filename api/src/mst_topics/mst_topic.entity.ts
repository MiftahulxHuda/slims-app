import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum TopicType {
    TOPIC = "t",
    GEOGRAPHIC = "g",
    NAME = "n",
    TEMPORAL = "tm",
    GENRE = "gr",
    OCCUPATION = "oc"
}

@Entity('mst_topic')
export class MST_Topic extends BaseEntity {
    @PrimaryGeneratedColumn()
    topic_id: number;

    @Column()
    topic: string;

    @Column({ default: TopicType.TOPIC })
    topic_type: TopicType;

    @Column()
    auth_list: string;

    @Column()
    classification: string;

    @Column({ select: false })
    input_date: string;

    @Column({ select: false })
    last_update: string;
}
