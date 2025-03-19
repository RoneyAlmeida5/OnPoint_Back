import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './payment.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll(): Promise<Payment[]> {
    return this.paymentsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Payment> {
    return this.paymentsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.paymentsService.create(createPaymentDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(id, updatePaymentDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.paymentsService.delete(id);
  }
}
