import { Column, DataType, Default, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { v4 } from "uuid";
import { Account } from "./account";

export enum UserRole {
    REGULAR = "REGULAR",
    ADMIN = "ADMIN"
}

export enum AuthMethod {
    CREDENTIALS = "CREDENTIALS",
    GOOGLE = "GOOGLE",
    YANDEX = "YANDEX"
} 

@Table({ tableName: "Users" })
export class User extends Model {
    @PrimaryKey
    @Default(v4)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    id: string = v4()

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    email: string

      @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    userName: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string

    @Column({
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null,
    })
    avatarUrl?: string | null

    @Column({
        type: DataType.ENUM(...Object.values(AuthMethod)),
        allowNull: false,
    })
    authMethod: string

    @Column({
        type: DataType.ENUM(...Object.values(UserRole)),
        allowNull: false,
        defaultValue: "REGULAR"
    })
    role: string

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    isVerified: boolean

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    isTwoFactorEnabled: boolean

    @HasOne(() => Account)
    account: Account
}