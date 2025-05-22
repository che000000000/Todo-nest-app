import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @IsString({ message: "Имя пользователя должно быть строкой." })
    @IsNotEmpty({ message: "Не введено имя пользователя." })
    userName: string

    @IsString({ message: "Эл. почта должна быть строкой." })
    @IsEmail({}, { message: "Введённая строка не является почтой." })
    @IsNotEmpty({ message: "Не введена почта." })
    email: string

    @IsString({ message: "Пароль должен быть строкой." })
    @IsNotEmpty({ message: "Не введён пароль." })
    @MinLength(6, { message: "Пароль должен быть не короче 6 символов." })
    password: string

    @IsString()
    @IsNotEmpty({ message: "Подтвердите пароль." })
    repeatPassword: string

    @IsOptional()
    @IsString({ message: "Ссылка на картинку для аватара не является строкой" })
    avatarUrl?: string
}