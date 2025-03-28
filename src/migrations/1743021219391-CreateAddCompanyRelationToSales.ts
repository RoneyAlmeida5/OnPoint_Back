import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAddCompanyRelationToSales1743021219391
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`sales\`
      ADD COLUMN \`company_id\` int NULL,
      ADD CONSTRAINT \`FK_sales_company\`
      FOREIGN KEY (\`company_id\`) REFERENCES \`companies\`(\`id\`)
      ON DELETE SET NULL ON UPDATE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`sales\` DROP FOREIGN KEY \`FK_sales_company\`
    `);
    await queryRunner.query(`
      ALTER TABLE \`sales\` DROP COLUMN \`company_id\`
    `);
  }
}
