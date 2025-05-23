import { BadRequestException, Body, Controller, Get, ParseUUIDPipe, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser } from './dto/create-user.dto';
import { appExceptions } from 'src/Exceptions/exceptions';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('get-one')
    getUserData (@Query('userId', new ParseUUIDPipe()) userId: string) {
        const foundUser = this.usersService.findUserById(userId)
        if(foundUser) return foundUser
        else throw new BadRequestException(appExceptions.userNotFound)
    }
}