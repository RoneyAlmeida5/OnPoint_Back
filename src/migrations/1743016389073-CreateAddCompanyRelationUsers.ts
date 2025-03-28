import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAddCompanyRelationUsers1743016389073
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`users\`
      ADD COLUMN \`company_id\` int NULL
    `);

    await queryRunner.query(`
      ALTER TABLE \`users\`
      ADD CONSTRAINT \`FK_users_company\` 
      FOREIGN KEY (\`company_id\`) REFERENCES 
      \`companies\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_users_company\`
    `);

    await queryRunner.query(`
      ALTER TABLE \`users\` DROP COLUMN \`company_id\`
    `);
  }
}
