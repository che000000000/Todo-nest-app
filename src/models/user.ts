import { Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";
import { v4 } from "uuid";

@Table({tableName: "Users"})
export class User extends Model {
    @PrimaryKey
    @Default(v4)
    @Column(DataType.UUID)
    id: string = v4()

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    userName: string
}