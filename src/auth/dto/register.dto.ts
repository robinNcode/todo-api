import { IsEmail, IsNotEmpty, MinLength, MaxLength, ValidateIf } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'email must be a valid email address' })
  @IsNotEmpty({ message: 'email is required' })
  @ValidateIf((o) => o.email !== null && o.email !== undefined && o.email !== '') 
  email: string;

  @IsNotEmpty({ message: 'password is required' })
  @MinLength(6, { message: 'password must be at least 6 characters long' })
  @MaxLength(50, { message: 'password must not exceed 50 characters' })
  @ValidateIf((o) => o.password !== null && o.password !== undefined && o.password !== '')
  password: string;

  @IsNotEmpty({ message: 'name is required' })
  @MinLength(2, { message: 'name must be at least 2 characters long' })
  @MaxLength(50, { message: 'name must not exceed 50 characters' })
  @ValidateIf((o) => o.name !== null && o.name !== undefined && o.name !== '')
  name: string;
}
