import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }


    @Post('/login')
    login(@Body() authCredentialsDto: AuthCredentialsDto) {
        return this.authService.login(authCredentialsDto);
    }
}