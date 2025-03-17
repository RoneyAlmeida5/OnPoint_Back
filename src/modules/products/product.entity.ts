import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { BeforeInsert } from 'typeorm';
import { Sale } from '../sales/sale.entity';

@Entity('products') // Defina o nome explícito para evitar erros
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 36, unique: true }) // Corrigindo o tipo
  uuid: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 }) // Ajuste para valores decimais
  value: number;

  @Column({ type: 'text' }) // Correção para suportar grandes textos
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
