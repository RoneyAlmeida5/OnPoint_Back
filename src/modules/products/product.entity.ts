import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { SaleProduct } from '../sales/sales_product.entity';
import { Company } from '../company/company.entity';

@Index(['uuid', 'companyId'], { unique: true })
@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 36 })
  uuid: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  value: number;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => Company, (company) => company.products, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column({ type: 'int' })
  companyId: number;

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
