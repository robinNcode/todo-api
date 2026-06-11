import { IsEmail, IsNotEmpty, MinLength, ValidateIf } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'email is required' })
  @ValidateIf((o) => o.email !== null && o.email !== undefined && o.email !== '')
  @IsEmail({}, { message: 'email must be a valid email address' })
  email: string;

  @IsNotEmpty({ message: 'password is required' })
  @ValidateIf((o) => o.password !== null && o.password !== undefined && o.password !== '')
  @MinLength(6, { message: 'password must be at least 6 characters long' })
  password: string;
}
