import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user';
import { RegistrateUserDto } from './dto/registrate-user.dto';
import { appExceptions } from 'src/Exceptions/exceptions';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private readonly usersRepository: typeof User) { }

    async findUser(userId: string) {
        const foundUser = await this.usersRepository.findOne({ where: { id: userId } })
        return foundUser
    }

    async createUser(dto: RegistrateUserDto): Promise<User> {
        const newUser = await this.usersRepository.create({
            userName: dto.userName,
            specialization: dto.specialization,
            avatarUrl: dto.avatarUrl
        })
        return newUser
    }
}