import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Author {

    @PrimaryGeneratedColumn()
    id = undefined

    @Column("varchar")
    name = ""
}