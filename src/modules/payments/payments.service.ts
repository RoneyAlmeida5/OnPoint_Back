import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>,
  ) {}

  async findAll(): Promise<Payment[]> {
    return this.paymentsRepository.find();
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentsRepository.findOne({ where: { id } });
    if (!payment) {
      throw new Error(`Método de pagamento com ID ${id} não encontrado`);
    }
    return payment;
  }

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const newPayment = this.paymentsRepository.create(createPaymentDto);
    return this.paymentsRepository.save(newPayment);
  }

  async update(
    id: number,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    const existingPayment = await this.findOne(id); // ✅ Agora garantimos que não será null

    const updatedPayment = {
      ...existingPayment,
      ...updatePaymentDto,
    };

    await this.paymentsRepository.save(updatedPayment);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    const result = await this.paymentsRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Método de pagamento com ID ${id} não encontrado`);
    }
  }
}
