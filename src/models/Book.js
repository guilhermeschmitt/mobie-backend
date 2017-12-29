import { Entity, PrimaryGeneratedColumn, Column, JoinTable, JoinColumn, BaseEntity, ManyToMany, OneToOne } from "typeorm";
import { Author, Genre } from './'

@Entity()
export class Book {

  @PrimaryGeneratedColumn()
  id = undefined
  
  @Column("varchar")
  title = undefined
  
  @Column({ type: "varchar", nullable: false, unique: true })
  isbn = undefined
  
  @Column({ type: "datetime", nullable: true })
  releaseDate = undefined

  @OneToOne(type => Genre)
  @JoinColumn()
  genre = undefined

  @ManyToMany(type => Author)
  @JoinTable({ referencedColumnName: "book_authors" })
  authors = []
}