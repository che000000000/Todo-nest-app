import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { User } from 'src/models/user';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly configService: ConfigService
    ) { }

    comparePasswords(password, repeat_password) {
        if (password === repeat_password) return password
        else throw new BadRequestException('Passwords not mutch.')
    }

    async register(dto: RegisterDto) {
        const isExists = await this.usersService.findUserByEmail(dto.email)
        if (isExists) throw new BadRequestException('This email already using.')

        return await this.usersService.createUser({
            userName: dto.userName,
            email: dto.email,
            password: await this.comparePasswords(dto.password, dto.repeatPassword),
            avatarUrl: dto.avatarUrl
        })
    }

    async login(dto: LoginDto, req: Request) {
        const foundUser = await this.usersService.findUserByEmail(dto.email)
        if (!foundUser || !foundUser.dataValues.password) throw new NotFoundException('User does not exist.')

        const isValidPassword = await bcrypt.compare(dto.password, foundUser.dataValues.password)
        if (!isValidPassword) throw new UnauthorizedException('Incorrect password.')

        return this.saveSession(req, foundUser)
    }

    async logout(req: Request, res: Response): Promise<void> {
        return new Promise((reslove, reject) => {
            req.session.destroy(error => {
                if (error) {
                    reject(
                        new InternalServerErrorException(`Can't destroy session. Maybe session always destroyed or server error.`)
                    )
                }
            })
            res.clearCookie(`${this.configService.get('session.name')}`)
            reslove()
        })
    }

    private async saveSession(req: Request, user: User) {
        return new Promise((resolve, reject) => {
            req.session.userId = user.dataValues.id

            req.session.save(error => {
                if (error) {
                    return reject(
                        new InternalServerErrorException('Session not saved.')
                    )
                }
                resolve(user)
            })
        })
    }
}