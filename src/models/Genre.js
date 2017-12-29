import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id = undefined

  @Column({ type: "varchar", unique: true })
  name = ""
}