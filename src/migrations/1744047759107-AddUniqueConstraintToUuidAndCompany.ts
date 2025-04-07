import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUniqueConstraintToUuidAndCompany1744047759107
  implements MigrationInterface
{
  name = 'AddUniqueConstraintToUuidAndCompany1744047759107';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE products
            ADD CONSTRAINT UQ_products_uuid_company
            UNIQUE (uuid, companyId)
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE products
            DROP CONSTRAINT UQ_products_uuid_company
        `);
  }
}
