import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async findAll(): Promise<Payment[]> {
    return this.paymentRepository.find();
  }

  async findOne(id: number): Promise<Payment> {
    return this.paymentRepository.findOne({ where: { id } });
  }

  async create(payment: Partial<Payment>): Promise<Payment> {
    return this.paymentRepository.save(payment);
  }

  async update(id: number, payment: Partial<Payment>): Promise<void> {
    await this.paymentRepository.update(id, payment);
  }

  async delete(id: number): Promise<void> {
    await this.paymentRepository.delete(id);
  }
}
