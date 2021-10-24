import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthCredentialsDto {
    @ApiProperty({
        default: "admin"
    })
    @IsString()
    username: string;

    @ApiProperty({
        default: "password"
    })
    @IsString()
    password: string;
}