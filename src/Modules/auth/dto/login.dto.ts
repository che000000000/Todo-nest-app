import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsString({ message: "Email should be string." })
    @IsNotEmpty({ message: "Email is not entered." })
    email: string

    @IsString({ message: "Password should be string." })
    @IsNotEmpty({ message: "Password is not entered." })
    password: string
}