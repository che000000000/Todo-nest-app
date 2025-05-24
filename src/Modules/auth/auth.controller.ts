import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res, ValidationPipe } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    register(@Body(ValidationPipe) dto: RegisterDto) {
        return this.authService.register(dto)
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Req() req: Request, @Body(ValidationPipe) dto: LoginDto) {
        return this.authService.login(dto, req)
    }

    @HttpCode(HttpStatus.OK)
    @Post('logout')
    logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        return this.authService.logout(req, res)
    }
}