import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Sale } from '../sales/sale.entity';
import { Company } from '../company/company.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @OneToMany(() => Sale, (sale) => sale.payment)
  sales: Sale[];

  // 👇 Adiciona esta coluna explicitamente
  @Column({ nullable: true })
  companyId: number;

  @ManyToOne(() => Company, (company) => company.users, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'companyId' }) // 👈 Faz o vínculo manual com a coluna
  company: Company;
}
