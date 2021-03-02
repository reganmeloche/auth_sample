import {Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { Task } from './Task';

@Entity()
export class User {

    @PrimaryColumn("text")
    id: string;

    @Column("text")
    email: string;

    @Column("text")
    hashedPassword: string;

    @Column("timestamp")
    createDate: Date;

    @Column("text", { array: true })
    claims: string[];

    @OneToMany(() => Task, x => x.user) 
    tasks: Task[];
}
