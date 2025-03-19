import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Payment } from '../payments/payment.entity';
import { SaleProduct } from '../sales/sales_product.entity';

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Payment, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'payment_id' })
  payment: Payment;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date_sale: Date;

  @OneToMany(() => SaleProduct, (saleProduct) => saleProduct.sale, {
    cascade: true,
  })
  saleProducts: SaleProduct[];
}
