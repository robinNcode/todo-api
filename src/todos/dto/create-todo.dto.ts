import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateTodoDto {
  @IsString({ message: 'title must be a string' })
  @IsNotEmpty({ message: 'title is required' })
  @MaxLength(255, { message: 'title must not exceed 255 characters' })
  title: string;

  @IsString({ message: 'description must be a string' })
  @IsOptional()
  @MaxLength(1000, { message: 'description must not exceed 1000 characters' })
  description?: string;
}
