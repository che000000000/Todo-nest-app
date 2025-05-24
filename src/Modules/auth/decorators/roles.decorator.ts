import { SetMetadata } from "@nestjs/common"

export const enum UserRole { // ХАРДКОД. Доработать
    REGULAR = 'REGULAR',
    ADMIN = 'ADMIN'
} 

export const ROLES_KEY = 'roles'

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles)