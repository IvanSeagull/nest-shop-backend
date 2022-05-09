import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>){}

  // Create user
  create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }

  // find all users
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  // find one user
  async findOne(id: number) : Promise<User | string | object> {
    try {
      const user = await this.usersRepository.findOneOrFail(id);
      return user;
    } catch (error) {
      return new NotFoundException().getResponse();
      
    }
  }

  // update user
  async update(id: number, updateUserDto: UpdateUserDto) : Promise<User | string | object> {    
    let user = await this.usersRepository.findOne(id);
    if(!user) {
      return new NotFoundException().getResponse();
    }
    user = Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }


  // delete user
  async remove(id: number): Promise<User | string | object> {
    const user = await this.usersRepository.findOne(id);
    if(!user) {
      return new NotFoundException().getResponse();
    }
    return this.usersRepository.remove(user);
  }
}
