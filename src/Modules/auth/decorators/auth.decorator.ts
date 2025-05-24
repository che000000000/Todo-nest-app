import { applyDecorators, UseGuards } from "@nestjs/common";
import { Roles, UserRole } from "./roles.decorator";
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";

export function Authorizaton (...roles: UserRole[]) {
    if (roles.length > 0) {
        return applyDecorators(
            Roles(...roles),
            UseGuards(AuthGuard, RolesGuard)
        )
    }

    return applyDecorators(UseGuards(AuthGuard))
}