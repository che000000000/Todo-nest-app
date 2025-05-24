import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, userRole } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<userRole[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass
    ])
    const request = context.switchToHttp().getRequest()

    if(!roles) return true

    if(!roles.includes(request.user.role)) throw new ForbiddenException('You have no roots for access this resource.')

    return true
  }
}