import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreateSaleDto {
  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @IsNotEmpty()
  @IsNumber()
  payment_id: number;

  @IsNotEmpty()
  @IsDateString()
  date_sale: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
