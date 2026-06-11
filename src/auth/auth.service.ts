import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, name } = registerDto;

    // Check if user already exists
    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    // Hash password
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user

    const user = this.usersRepository.create({
      email,
      password: hashedPassword,
      name,
    });

    const savedUser = await this.usersRepository.save(user);

    // Generate JWT token
    const token = this.generateToken(savedUser.id, savedUser.email);

    return {
      access_token: token,
      user: {
        id: savedUser.id,
        email: savedUser.email,
        name: savedUser.name,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user by email
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const token = this.generateToken(user.id, user.email);

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async validateUser(userId: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id: userId } });
  }

  private generateToken(userId: string, email: string): string {
    return this.jwtService.sign({
      sub: userId,
      email,
    });
  }
}
