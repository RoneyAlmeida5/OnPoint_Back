import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Sale } from '../sales/sale.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: '' })
  token: string;

  @OneToMany(() => Sale, (sale) => sale.user)
  sales: Sale[];

  @Column({ default: false })
  user_blocked: boolean;
}
