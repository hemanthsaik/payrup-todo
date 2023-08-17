import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("todos")
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  task: string;

  @Column({ default: false })
  isDone: boolean;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
}
