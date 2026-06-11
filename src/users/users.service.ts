import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getProfile(userId: string) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: { todos: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Remove password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async updateProfile(userId: string, updateData: Partial<User>) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // If password is being updated, hash it
    if (updateData.password) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    // Only allow updating name and password
    if (updateData.name) {
      user.name = updateData.name;
    }
    if (updateData.password) {
      user.password = updateData.password;
    }

    const updatedUser = await this.usersRepository.save(user);

    // Remove password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async findById(userId: string) {
    return this.usersRepository.findOne({
      where: { id: userId },
    });
  }
}
