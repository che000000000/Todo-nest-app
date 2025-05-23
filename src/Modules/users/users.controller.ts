import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { Authorized } from '../auth/decorators/authorized.decorator';
import { Authorizaton } from '../auth/decorators/auth.decorator';
import { UserRole } from 'src/models/user';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Authorizaton(UserRole.REGULAR)
    @Get('profile')
    getUserProfile(@Authorized() userId: string) {
        return this.usersService.findUserById(userId)
    }
}