import { applyDecorators, UseGuards } from "@nestjs/common";
import { Roles } from "./roles.decorator";
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";
import { UserRole } from "src/models/user";

export function Authorizaton(requiredRole: UserRole) {
    return applyDecorators(
        Roles(requiredRole),
        UseGuards(AuthGuard, RolesGuard)
    )
}