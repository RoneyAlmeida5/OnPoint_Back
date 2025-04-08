import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';
import { Sale } from '../sales/sale.entity';
import { Payment } from '../payments/payment.entity';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cnpj: string;

  @Column({ default: false })
  is_blocked: boolean;

  @OneToMany(() => User, (user) => user.company)
  users: User[];

  @OneToMany(() => Product, (product) => product.company)
  products: Product[];

  @OneToMany(() => Payment, (payment) => payment.company)
  payments: Payment[];

  @OneToMany(() => Sale, (sale) => sale.company)
  sales: Sale[];
}
