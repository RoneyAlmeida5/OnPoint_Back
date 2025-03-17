import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Sale } from '../sales/sale.entity';

@Entity('payments') // Nome explícito da tabela para evitar conflitos
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true }) // Ajuste para string no MySQL
  name: string;

  @OneToMany(() => Sale, (sale) => sale.payment)
  sales: Sale[];
}
