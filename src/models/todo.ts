import { Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";
import { v4 } from "uuid";

@Table({tableName: "Todos"})
export class Todo extends Model {
    @PrimaryKey
    @Default(v4)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    id: string = v4()

    @Column({
        type: DataType.TEXT,
        allowNull: false,
        defaultValue: "No text",
    })
    textTodo: string

    @Column(DataType.UUID)
    userId: string

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    })
    isComplete: boolean

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    })
    isPrivate: boolean
}