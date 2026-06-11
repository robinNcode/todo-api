import { IsString, MaxLength, IsOptional, IsBoolean } from 'class-validator';

export class UpdateTodoDto {
  @IsString({ message: 'title must be a string' })
  @IsOptional()
  @MaxLength(255, { message: 'title must not exceed 255 characters' })
  title?: string;

  @IsString({ message: 'description must be a string' })
  @IsOptional()
  @MaxLength(1000, { message: 'description must not exceed 1000 characters' })
  description?: string;

  @IsBoolean({ message: 'isCompleted must be a boolean' })
  @IsOptional()
  isCompleted?: boolean;
}
