import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';

import { Injectable } from '@nestjs/common';
// import { DataSource } from 'typeorm/data-source/DataSource';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>{
    const ( status, search) = filterDto;

    const query = this.createQueryBuilder('task');

    if (status){
      query.andWhere('task.status = : status', { status});
    }

    if( search ) {
      query.andWhere(
        'task.title LIKE :search  OR task.description LIKE :search',
        { search: `%${search}%`},
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }
  async createTask({ title, description }: CreateTaskDto): Promise<Task> {
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.save(task);
    return task;
  }
}

// @EntityRepository(Task)
// export class TasksRepository extends Repository<Task> {

//   // async getTasks(filterDto: GetTasksFilterDto): Promise<Task> {
//   //   const { status, search } = filterDto;
//   // }
//   // async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
//   //   const { title, description } = createTaskDto;
//   //   const task = this.create({
//   //     title,
//   //     description,
//   //     status: TaskStatus.OPEN,
//   //   });
//   //   await this.save(task);
//   //   return task;
//   // }
// }
