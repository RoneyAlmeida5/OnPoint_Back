import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { BeforeInsert } from 'typeorm';
import { Sale } from '../sales/sale.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  name: string;

  @Column('decimal')
  value: number;

  @Column()
  description: string;

  @OneToMany(() => Sale, (sale) => sale.product)
  sales: Sale[];

  @BeforeInsert()
  generateUuid() {
    if (!this.uuid) {
      this.uuid = uuidv4();
    }
  }
}
