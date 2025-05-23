import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @IsString({ message: "Username should be string." })
    @IsNotEmpty({ message: "Username not entered." })
    userName: string

    @IsString({ message: "Email should be string." })
    @IsEmail({}, { message: "Email should be email type." })
    @IsNotEmpty({ message: "Email not entered." })
    email: string

    @IsString({ message: "Password should be string." })
    @IsNotEmpty({ message: "Не введён пароль." })
    @MinLength(6, { message: "Password should be consist of minimum six simbols." })
    password: string

    @IsString()
    @IsNotEmpty({ message: "Repeat password." })
    repeatPassword: string

    @IsOptional()
    @IsString({ message: "Avatar url should be string." })
    avatarUrl?: string
}