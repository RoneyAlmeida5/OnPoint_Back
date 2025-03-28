import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAddCompanyRelationToPayments1743021194404
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`payments\`
      ADD COLUMN \`company_id\` int NULL,
      ADD CONSTRAINT \`FK_payments_company\`
      FOREIGN KEY (\`company_id\`) REFERENCES \`companies\`(\`id\`)
      ON DELETE SET NULL ON UPDATE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`payments\` DROP FOREIGN KEY \`FK_payments_company\`
    `);
    await queryRunner.query(`
      ALTER TABLE \`payments\` DROP COLUMN \`company_id\`
    `);
  }
}
