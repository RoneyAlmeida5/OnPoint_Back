import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
import { Company } from '../company/company.entity';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { companyId, password, ...userData } = createUserDto;

    let company: Company | null | undefined = undefined;
    if (companyId) {
      company = await this.companyRepository.findOne({
        where: { id: companyId },
      });
      if (!company) {
        throw new NotFoundException(
          `Empresa com ID ${companyId} não encontrada.`,
        );
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
      company,
    });

    const savedUser = await this.userRepository.save(user);

    const token = this.generateToken(savedUser);

    savedUser.token = token;
    await this.userRepository.save(savedUser);

    return savedUser;
  }

  findAll() {
    return this.userRepository.find({ relations: ['company'] });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['company'],
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  private generateToken(user: User) {
    return jwt.sign(
      {
        userId: user.id,
        companyId: user.company?.id,
        role: user.id === 1 ? 'admin' : 'user',
      },
      'xFiEjr0GjS8Q',
      { expiresIn: '1h' },
    );
  }

  async findByCompany(companyId: number): Promise<User[]> {
    return this.userRepository.find({
      where: { company: { id: companyId } },
      relations: ['company'],
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['company'],
    });
  }
}
