import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  async create(userId: string, createTodoDto: CreateTodoDto) {
    const todo = this.todosRepository.create({
      ...createTodoDto,
      userId,
    });
    return this.todosRepository.save(todo);
  }

  async findAll(userId: string) {
    return this.todosRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(userId: string, id: string) {
    const todo = await this.todosRepository.findOne({
      where: { id, userId },
    });

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return todo;
  }

  async update(userId: string, id: string, updateTodoDto: UpdateTodoDto) {
    const todo = await this.findOne(userId, id);

    // Update only provided fields
    if (updateTodoDto.title !== undefined) {
      todo.title = updateTodoDto.title;
    }
    if (updateTodoDto.description !== undefined) {
      todo.description = updateTodoDto.description;
    }
    if (updateTodoDto.isCompleted !== undefined) {
      todo.isCompleted = updateTodoDto.isCompleted;
    }

    return this.todosRepository.save(todo);
  }

  async remove(userId: string, id: string) {
    const todo = await this.findOne(userId, id);
    return this.todosRepository.remove(todo);
  }
}
