import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { SaleProduct } from '../sales/sales_product.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 36, unique: true })
  uuid: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  value: number;

  @Column({ type: 'text' })
  description: string;

  // Atualize para refletir a relação com SaleProduct
  @OneToMany(() => SaleProduct, (saleProduct) => saleProduct.product, {
    cascade: true,
  })
  saleProducts: SaleProduct[];

  @BeforeInsert()
  generateUuid() {
    if (!this.uuid) {
      this.uuid = uuidv4();
    }
  }
}
