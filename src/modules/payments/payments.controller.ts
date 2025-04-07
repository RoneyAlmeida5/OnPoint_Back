import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './payment.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('payments')
@UseGuards(AuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  findAll(@Request() req): Promise<Payment[]> {
    const companyId = Number(req.user.companyId);
    return this.paymentsService.findAll(companyId);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Payment> {
    return this.paymentsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreatePaymentDto, @Request() req): Promise<Payment> {
    const companyId = Number(req.user.companyId);
    return this.paymentsService.create(dto, companyId);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdatePaymentDto,
    @Request() req,
  ): Promise<Payment> {
    const companyId = Number(req.user.companyId);
    return this.paymentsService.update(id, dto, companyId);
  }

  @Delete(':id')
  delete(@Param('id') id: number, @Request() req): Promise<void> {
    const companyId = Number(req.user.companyId);
    return this.paymentsService.delete(id, companyId);
  }
}
