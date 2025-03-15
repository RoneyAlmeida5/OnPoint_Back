import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';
import { Payment } from '../payments/payment.entity';

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.sales)
  user: User;

  @ManyToOne(() => Product, (product) => product.sales)
  product: Product;

  @ManyToOne(() => Payment, (payment) => payment.sales)
  payment: Payment;

  @Column()
  date_sale: Date;

  @Column()
  quantity: number;
}
