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

  async findAll(companyId: number): Promise<Payment[]> {
    return this.paymentsRepository.find({ where: { companyId } });
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentsRepository.findOne({ where: { id } });
    if (!payment) {
      throw new Error(`Método de pagamento com ID ${id} não encontrado`);
    }
    return payment;
  }

  async create(
    createPaymentDto: CreatePaymentDto,
    companyId: number,
  ): Promise<Payment> {
    const newPayment = this.paymentsRepository.create({
      ...createPaymentDto,
      companyId,
    });
    return this.paymentsRepository.save(newPayment);
  }

  async update(
    id: number,
    updatePaymentDto: UpdatePaymentDto,
    companyId: number,
  ): Promise<Payment> {
    const existingPayment = await this.findOne(id);

    if (existingPayment.companyId !== companyId) {
      throw new Error(
        'Acesso negado: este método de pagamento pertence a outra empresa',
      );
    }

    const updatedPayment = {
      ...existingPayment,
      ...updatePaymentDto,
    };

    await this.paymentsRepository.save(updatedPayment);
    return this.findOne(id);
  }

  async delete(id: number, companyId: number): Promise<void> {
    const payment = await this.findOne(id);
    if (payment.companyId !== companyId) {
      throw new Error(
        'Acesso negado: este método de pagamento pertence a outra empresa',
      );
    }

    const result = await this.paymentsRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Método de pagamento com ID ${id} não encontrado`);
    }
  }
}
