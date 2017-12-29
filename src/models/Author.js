import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Author extends BaseEntity {

  @PrimaryGeneratedColumn()
  id = undefined

  @Column({ type: "varchar"})
  name = ""
}