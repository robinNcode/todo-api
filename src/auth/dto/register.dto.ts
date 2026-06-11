import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'email must be a valid email address' })
  @IsNotEmpty({ message: 'email is required' })
  email: string;

  @IsNotEmpty({ message: 'password is required' })
  @MinLength(6, { message: 'password must be at least 6 characters long' })
  @MaxLength(50, { message: 'password must not exceed 50 characters' })
  password: string;

  @IsNotEmpty({ message: 'name is required' })
  @MinLength(2, { message: 'name must be at least 2 characters long' })
  @MaxLength(50, { message: 'name must not exceed 50 characters' })
  name: string;
}
