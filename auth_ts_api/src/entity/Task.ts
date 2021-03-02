import {Entity, PrimaryColumn, RelationId, Column, ManyToOne } from "typeorm";
import { User } from './User';

@Entity()
export class Task {

    @PrimaryColumn("text")
    id: string;

    @Column("text")
    description: string;

    @Column("timestamp")
    createDate: Date;

    @Column("timestamp", { nullable: true })
    completeDate: Date;

    @Column("boolean")
    completed: Boolean;

    @ManyToOne(() => User, user => user.tasks)
    user: User;

    @Column("text")
    @RelationId((task: Task) => task.user)
    userId: string;
}
