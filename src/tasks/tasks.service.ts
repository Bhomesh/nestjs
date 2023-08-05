import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { Task } from './task.entity';
import { TasksRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private taskRepository: TasksRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id } });
    console.log(found);
    if (!found) {
      throw new NotFoundException(`Task with ID " ${id} " not found`);
    }
    return found;
  }
  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async deleteTaskById(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    console.log(result);
    if (result) {
      throw new NotFoundException(`Task with ID " ${id}" not found`);
    }
  }
  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);

    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }
}
// constructor(
//   @InjectRepository(TasksRepository)
//   private tasksRepository: TasksRepository,
// ) {}

// getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
//   return this.tasksRepository.getTasks(filterDto, user);
// }

// async getTaskById(id: string): Promise<Task> {
//   const found = await this.tasksRepository.findOne(id);

//   if (!found) {
//     throw new NotFoundException(`Task with ID "${id}" not found`);
//   }

//   return found;
// }

// createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
//   return this.tasksRepository.createTask(createTaskDto, user);
// }

// async deleteTask(id: string, user: User): Promise<void> {
//   const result = await this.tasksRepository.delete({ id, user });

//   if (result.affected === 0) {
//     throw new NotFoundException(`Task with ID "${id}" not found`);
//   }
// }

// async updateTaskStatus(
//   id: string,
//   status: TaskStatus,
//   user: User,
// ): Promise<Task> {
//   const task = await this.getTaskById(id, user);

//   task.status = status;
//   await this.tasksRepository.save(task);

//   return task;
// }
// }
