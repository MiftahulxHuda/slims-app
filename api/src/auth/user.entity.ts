import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('user')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({
        unique: true
    })
    username: string;

    @Column({
        unique: true
    })
    realname: string;

    @Column()
    passwd: string;

    @Column()
    email: string;

    @Column()
    groups: string;    

    async validatePassword(password: string): Promise<boolean> {
        const match = await bcrypt.compare(password, this.passwd.replace(/^\$2y/, "$2b"));
        return match;
    }
}