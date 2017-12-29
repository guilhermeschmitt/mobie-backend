import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Author {

  @PrimaryGeneratedColumn()
  id = undefined

  @Column({ type: "varchar"})
  name = ""
}