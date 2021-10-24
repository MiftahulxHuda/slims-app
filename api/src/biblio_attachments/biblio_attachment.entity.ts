import { BaseEntity, Entity, Column, PrimaryColumn } from 'typeorm';

export enum Placement {
    LINK = "link",
    POPUP = "popup",
    EMBED = "embed"
}

export enum AccessType {
    PUBLIC = "public",
    PRIVATE = "private"
}

@Entity('biblio_attachment')
export class Biblio_Attachment extends BaseEntity {
  @PrimaryColumn()
  biblio_id: number;

  @PrimaryColumn()
  file_id: number;

  @Column()
  placement: Placement;

  @Column()
  access_type: AccessType;

  @Column()
  access_limit: string;
}
