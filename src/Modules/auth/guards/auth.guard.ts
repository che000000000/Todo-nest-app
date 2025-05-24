import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, userRole } from '../decorators/roles.decorator';
import { UsersService } from 'src/modules/users/users.service';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private userService: UsersService) { }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest() 

        if (typeof request.session.userId === 'undefined') throw new UnauthorizedException('User not authorized.')
        const user = await this.userService.findUserById(request.session.userId)
        if (!user) throw new UnauthorizedException('User not found.')
        
        request.user = user

        return true
    }
}