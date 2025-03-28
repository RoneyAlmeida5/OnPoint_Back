// src/migrations/xxxxxx-CreateCompanyTable.ts
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCompanyTable1743016040265 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE \`companies\` (
            \`id\` int NOT NULL AUTO_INCREMENT,
            \`name\` varchar(255) NOT NULL,
            \`cnpj\` varchar(18) NOT NULL,
            \`is_blocked\` tinyint NOT NULL DEFAULT 0,
            PRIMARY KEY (\`id\`)
          ) ENGINE=InnoDB
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`companies\``);
  }
}
