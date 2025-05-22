import { Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";
import { v4 } from "uuid";

@Table({tableName: "Tokens"})
export class Token extends Model {
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
        unique: true,
    })
    token: string

    @Column({
        type: DataType.ENUM("VERIFICATION", "TWO_FACTOR", "PASSWORD_RESET"),
        allowNull: false,
    })
    tokenType: string

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    expiresIn: Date
}