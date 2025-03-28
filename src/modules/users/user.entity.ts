import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Company } from '../company/company.entity';

export enum Role {
  Admin = 'admin',
  User = 'user',
}

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

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role; // Propriedade para o papel do usuário

  @ManyToOne(() => Company, (company) => company.users, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company?: Company; // Permite que seja `undefined`, mas não `null`

  @Column({ default: false })
  user_blocked: boolean;
}
