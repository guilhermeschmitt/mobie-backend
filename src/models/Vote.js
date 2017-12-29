import { Entity, PrimaryGeneratedColumn, Column, JoinTable, JoinColumn, ManyToMany, OneToOne, ManyToOne } from "typeorm";
import { User, Book } from './'

@Entity()
export class Vote {

  @PrimaryGeneratedColumn()
  id = undefined

  @Column({ type: "int" })
  rating = undefined

  @ManyToOne(type => User, user => user.votes)
  @JoinColumn({ name: 'userId' })
  user = undefined

  @Column({ nullable: false })
  userId = undefined

  @OneToOne(type => Book)
  @JoinColumn()
  book = undefined
}