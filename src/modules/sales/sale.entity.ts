import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';
import { Payment } from '../payments/payment.entity';

@Entity('sales') // Nome explícito da tabela
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Product, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Payment, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'payment_id' })
  payment: Payment;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }) // Correção do tipo para MySQL
  date_sale: Date;

  @Column({ type: 'int', unsigned: true }) // Correção para números positivos
  quantity: number;
}
