import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, ParseUUIDPipe, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { appExceptions } from 'src/Exceptions/exceptions';
import { Authotized } from '../auth/decorators/authorized.decorator';
import { Authorizaton } from '../auth/decorators/auth.decorator';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @HttpCode(HttpStatus.OK)
    @Get('get-one')
    getUserData(@Query('userId', new ParseUUIDPipe()) userId: string) {
        const foundUser = this.usersService.findUserById(userId)
        if (foundUser) return foundUser
        else throw new BadRequestException(appExceptions.userNotFound)
    }

    @Authorizaton()
    @HttpCode(HttpStatus.OK)
    @Get('profile')
    getUserProfile(@Authotized('id') userId: string) {
        console.log('userId: ', userId)
        return this.usersService.findUserById(userId)
    }
}