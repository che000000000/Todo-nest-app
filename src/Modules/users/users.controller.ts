import { BadRequestException, Body, Controller, Get, ParseUUIDPipe, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegistrateUserDto } from './dto/registrate-user.dto';
import { appExceptions } from 'src/Exceptions/exceptions';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('new')
    registrateUser (@Body(ValidationPipe) reqBody: RegistrateUserDto) {
        return this.usersService.createUser(reqBody)
    }

    @Get('get-one')
    getUserData (@Query('userId', new ParseUUIDPipe()) userId: string) {
        const foundUser = this.usersService.findUserById(userId)
        if(foundUser) return foundUser
        else throw new BadRequestException(appExceptions.userNotFound)
    }
}