import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

interface JwtUser {
  userId: string;
  email: string;
}

@ApiTags('Todos')
@ApiBearerAuth('access_token')
@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiResponse({ status: 201, description: 'Todo created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @CurrentUser() user: JwtUser,
    @Body() createTodoDto: CreateTodoDto,
  ) {
    return this.todosService.create(user.userId, createTodoDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all todos for current user' })
  @ApiResponse({ status: 200, description: 'Todos retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(@CurrentUser() user: JwtUser) {
    return this.todosService.findAll(user.userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a specific todo' })
  @ApiResponse({ status: 200, description: 'Todo retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  async findOne(@CurrentUser() user: JwtUser, @Param('id') id: string) {
    return this.todosService.findOne(user.userId, id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a todo' })
  @ApiResponse({ status: 200, description: 'Todo updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  async update(
    @CurrentUser() user: JwtUser,
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todosService.update(user.userId, id, updateTodoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a todo' })
  @ApiResponse({ status: 204, description: 'Todo deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  async remove(@CurrentUser() user: JwtUser, @Param('id') id: string) {
    return this.todosService.remove(user.userId, id);
  }
}
