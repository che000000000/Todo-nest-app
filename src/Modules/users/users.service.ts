import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user';
import { RegistrateUserDto } from './dto/registrate-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private readonly usersRepository: typeof User) { }

    findUserById(user_id: string) {
        return this.usersRepository.findOne({ where: { id: user_id } })
    }

    findUserByEmail(user_email: string) {
        return this.usersRepository.findOne({ where: { email: user_email } })
    }

    async createUser(dto: RegistrateUserDto): Promise<User> {
        const isUserEmailRegAlready = await this.findUserByEmail(dto.email)
        if (isUserEmailRegAlready) throw new BadRequestException('User with this email already exists')
        const newUser = await this.usersRepository.create({
            userName: dto.userName,
            email: dto.email,
            password: dto.password,
            specialization: dto.specialization,
            avatarUrl: dto.avatarUrl
        })
        return newUser
    }
}