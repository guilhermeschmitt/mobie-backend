import { Entity, PrimaryGeneratedColumn, Column, JoinTable, BaseEntity, ManyToMany } from "typeorm";
import { Author } from './Author'

@Entity()
export class Book extends BaseEntity {

  @PrimaryGeneratedColumn()
  id = undefined

  @ManyToMany(type => Author)
  @JoinTable({ referencedColumnName: "book_authors" })
  authors = []

  @Column("varchar")
  title = undefined

  @Column({ type: "varchar", nullable: false, unique: true })
  isbn = undefined

  @Column({ type: "datetime", nullable: true })
  releaseDate = undefined
}