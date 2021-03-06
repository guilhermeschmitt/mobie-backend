import { Entity,  Column, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User, Book } from './'

@Entity()
export class Vote {


  @Column({ type: "int" })
  rating = undefined
  
  @PrimaryColumn({type: "int", nullable: false })
  userId = undefined
  
  @PrimaryColumn({ type: "varchar", nullable: false })
  bookId = undefined

  @ManyToOne(type => User, user => user.votes)
  @JoinColumn({ name: 'userId' })
  user = undefined
}