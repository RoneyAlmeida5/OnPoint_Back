import { DataSource } from 'typeorm';
import { User, Role } from '../modules/users/user.entity';
import { Company } from '../modules/company/company.entity';
import * as bcrypt from 'bcryptjs';
import { AppDataSource } from '../data-source';

async function seed() {
  try {
    await AppDataSource.initialize();

    const userRepository = AppDataSource.getRepository(User);
    const companyRepository = AppDataSource.getRepository(Company);

    let company = await companyRepository.findOneBy({ id: 2 });

    if (!company) {
      company = companyRepository.create({
        id: 2,
        name: 'Empresa Exemplo',
        cnpj: '12.345.678/0001-90',
        is_blocked: false,
      });
      await companyRepository.save(company);
      console.log('Empresa criada:', company);
    } else {
      console.log('Empresa encontrada:', company);
    }

    const hashedPassword = await bcrypt.hash('31412736', 10);

    const user = userRepository.create({
      name: 'Fernando',
      cpf: '189.506.789-01',
      email: 'fernandonegao@teste.com',
      password: hashedPassword,
      role: Role.User,
      company: company,
    });
    await userRepository.save(user);

    console.log('Usuário criado:', user);

    console.log('🌱 Seed finalizado com sucesso!');
    process.exit(0);
  } catch (err) {
    console.error('Erro ao rodar seed:', err);
    process.exit(1);
  }
}

seed();
