import { Table, Column, Model, DataType, Default } from "sequelize-typescript";

@Table({
    tableName: "products", 
    timestamps: true, 
    underscored: true,
})

class product extends Model {
    @Column({
        type: DataType.STRING(100),
    })
    name: string;

    @Column({
        type: DataType.FLOAT(5,2),      
    })
    price: number;

    @Column({
        type: DataType.BOOLEAN      
    })
    disponibility: boolean;
}
export default product;