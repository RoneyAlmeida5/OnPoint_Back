import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Sale } from '../sales/sale.entity';
import { Company } from '../company/company.entity';

@Entity('payments')
@Unique(['name', 'companyId'])
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => Sale, (sale) => sale.payment)
  sales: Sale[];

  @Column({ nullable: true })
  companyId: number;

  @ManyToOne(() => Company, (company) => company.users, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'companyId' })
  company: Company;
}
