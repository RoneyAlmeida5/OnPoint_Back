import { DataSource } from 'typeorm';
import { User, Role } from '../modules/users/user.entity';
import { Company } from '../modules/company/company.entity';
import * as bcrypt from 'bcryptjs';
import { AppDataSource } from '../data-source';

async function seed() {
  try {
    // Inicializa a conexão com o banco de dados
    await AppDataSource.initialize();

    const userRepository = AppDataSource.getRepository(User);
    const companyRepository = AppDataSource.getRepository(Company);

    // Verifica se a empresa com id = 2 existe
    let company = await companyRepository.findOneBy({ id: 2 });

    if (!company) {
      // Se a empresa não existir, cria uma nova empresa com id = 2
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

    // Criação de um usuário com role = user vinculado à empresa com id = 2
    const hashedPassword = await bcrypt.hash('31412736', 10);

    const user = userRepository.create({
      name: 'Fernando',
      cpf: '189.506.789-01',
      email: 'fernandonegao@teste.com',
      password: hashedPassword,
      role: Role.User, // Define o papel como 'user'
      company: company, // Vincula o usuário à empresa com id = 2
    });
    await userRepository.save(user);

    console.log('Usuário criado:', user);

    // Finaliza o processo com sucesso
    console.log('🌱 Seed finalizado com sucesso!');
    process.exit(0); // Encerra o processo após finalizar o seeding
  } catch (err) {
    console.error('Erro ao rodar seed:', err);
    process.exit(1); // Encerra com erro em caso de falha
  }
}

// Chama a função de seeding
seed();
