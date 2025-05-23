import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user';
import { CreateUser } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private readonly usersRepository: typeof User) { }

    findUserById(user_id: string) {
        return this.usersRepository.findOne({ where: { id: user_id } })
    }

    findUserByEmail(user_email: string) {
        return this.usersRepository.findOne({ where: { email: user_email } })
    }

    async createUser(dto: CreateUser): Promise<User> {
        const isUserEmailRegAlready = await this.findUserByEmail(dto.email)
        if (isUserEmailRegAlready) throw new BadRequestException('User with this email already exists')
        const newUser = await this.usersRepository.create({
            email: dto.email,
            userName: dto.userName,
            password: await bcrypt.hash(dto.password, 10),
            avatarUrl: dto.avatarUrl,
            authMethod: "CREDENTIALS",
            role: "REGULAR",
        })
        return newUser
    }
}