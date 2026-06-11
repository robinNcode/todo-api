import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [UserModule, TodoModule, AuthModule, TodosModule],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {}
