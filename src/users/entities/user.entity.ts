import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Todo } from '../../todos/entities/todo.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Todo, (todo) => todo.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  todos: Todo[];
}
