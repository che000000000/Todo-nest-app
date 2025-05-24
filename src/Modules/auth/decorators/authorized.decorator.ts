import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "src/models/user";

export const Authotized = createParamDecorator(
    (data: keyof User, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        const user = request.user 
        console.log(user[data])

        return user.dataValues.id
    }
)