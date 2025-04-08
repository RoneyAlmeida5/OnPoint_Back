import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { Repository, DataSource } from 'typeorm';
import { User } from '../users/user.entity'; // <- importa a entidade User

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // <- injeta o repositório de usuários

    private readonly dataSource: DataSource,
  ) {}

  findAll(): Promise<Company[]> {
    return this.companyRepository.find({ relations: ['users'] });
  }

  async findOne(id: number): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: { id },
      relations: ['users'],
    });

    if (!company) {
      throw new NotFoundException(`Empresa com ID ${id} não encontrada.`);
    }

    return company;
  }

  create(companyData: Partial<Company>): Promise<Company> {
    const company = this.companyRepository.create(companyData);
    return this.companyRepository.save(company);
  }

  async update(id: number, data: Partial<Company>): Promise<Company> {
    await this.companyRepository.update(id, data);
    return this.findOne(id);
  }

  async removeWithUsers(id: number): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Excluir usuários relacionados à empresa
      await queryRunner.manager.delete(User, { company: { id } });

      // Excluir a empresa
      await queryRunner.manager.delete(Company, { id });

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number): Promise<void> {
    await this.companyRepository.delete(id);
  }

  // 🔐 Retorna usuários da empresa logada
  async findUsersByCompany(companyId: number) {
    return this.userRepository.find({
      where: { company: { id: companyId } },
      relations: ['company'],
    });
  }

  // 🔐 Retorna todos os usuários (admin)
  async findAllUsers() {
    return this.userRepository.find({
      relations: ['company'],
    });
  }
}
