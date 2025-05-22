import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

    comparePasswords (password, repeat_password) {
        if(password === repeat_password) return password
        else throw new BadRequestException('Passwords not mutch.')
    }

    async register (dto: RegisterDto) {
        const isExists = await this.usersService.findUserByEmail(dto.email)
        if(isExists) throw new BadRequestException('This email already using.')

        const newUser = await this.usersService.createUser({
            userName: dto.userName,
            email: dto.email,
            password: await this.comparePasswords(dto.password, dto.repeatPassword),
            avatarUrl: dto.avatarUrl
        })
        return newUser
    }
}