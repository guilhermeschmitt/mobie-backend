import { Entity, PrimaryGeneratedColumn, Column, JoinTable, JoinColumn, ManyToMany, OneToMany } from "typeorm";
import { Author, Genre, Vote } from './'

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id = undefined

  @Column({ type: "varchar", unique: true })
  username = ""

  @Column({ type: "varchar", unique: true })
  email = ""

  @Column({ type: "varchar", unique: false })
  password = ""

  @OneToMany(type => Vote, vote => vote.user)
  votes = []
}