import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { Payment } from './payment.entity';
import { JwtModule } from '@nestjs/jwt'; // Importar o módulo JWT

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]),
    JwtModule.register({
      secret: 'secretKey', // Certifique-se de que esta chave está sincronizada com o auth.module
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
