import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAddCompanyRelationToProducts1743021158618
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`products\`
      ADD COLUMN \`company_id\` int NULL,
      ADD CONSTRAINT \`FK_products_company\`
      FOREIGN KEY (\`company_id\`) REFERENCES \`companies\`(\`id\`)
      ON DELETE SET NULL ON UPDATE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_products_company\`
    `);
    await queryRunner.query(`
      ALTER TABLE \`products\` DROP COLUMN \`company_id\`
    `);
  }
}
