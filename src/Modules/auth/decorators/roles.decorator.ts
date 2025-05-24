import { SetMetadata } from "@nestjs/common"

export const enum userRole { // ХАРДКОД. Доработать
    REGULAR = 'REGULAR',
    ADMIN = 'ADMIN'
} 

export const ROLES_KEY = 'roles'

export const Roles = (...roles: userRole[]) => SetMetadata(ROLES_KEY, roles)