import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUniqueConstraintToPaymentNameAndCompany1744051155543
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          ALTER TABLE payments
          ADD CONSTRAINT UQ_payment_name_company UNIQUE (name, companyId)
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          ALTER TABLE payments
          DROP INDEX UQ_payment_name_company
        `);
  }
}
