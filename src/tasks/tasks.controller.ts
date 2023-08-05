import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { TasksRepository } from './task.repository';
import { filter } from 'rxjs';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]>{
    return this.tasksService.getTasks(filterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }
  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTaskById(id);
  }
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() UpdateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = UpdateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status);
  }
}

// @UseGuards(AuthGuard())
// export class TasksController {
//   private logger = new Logger('TasksController');

//   constructor(private tasksService: TasksService) {}

//   @Get()
//   getTasks(
//     @Query() filterDto: GetTasksFilterDto,
//     @GetUser() user: User,
//   ): Promise<Task[]> {
//     this.logger.verbose(
//       `User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(
//         filterDto,
//       )}`,
//     );
//     return this.tasksService.getTasks(filterDto, user);
//   }

//   @Get('/:id')
//   getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
//     return this.tasksService.getTaskById(id, user);
//   }

//   @Post()
//   createTask(
//     @Body() createTaskDto: CreateTaskDto,
//     @GetUser() user: User,
//   ): Promise<Task> {
//     this.logger.verbose(
//       `User "${user.username}" creating a new task. Data: ${JSON.stringify(
//         createTaskDto,
//       )}`,
//     );
//     return this.tasksService.createTask(createTaskDto, user);
//   }

//   @Delete('/:id')
//   deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
//     return this.tasksService.deleteTask(id, user);
//   }

//   @Patch('/:id/status')
//   updateTaskStatus(
//     @Param('id') id: string,
//     @Body() updateTaskStatusDto: UpdateTaskStatusDto,
//     @GetUser() user: User,
//   ): Promise<Task> {
//     const { status } = updateTaskStatusDto;
//     return this.tasksService.updateTaskStatus(id, status, user);
//   }
// }
