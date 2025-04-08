import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductTable1625839200000 implements MigrationInterface {
  name = 'CreateProductTable1625839200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`products\` (
        \`id\` INT NOT NULL AUTO_INCREMENT,
        \`uuid\` VARCHAR(36) NOT NULL UNIQUE,
        \`name\` VARCHAR(255) NOT NULL,
        \`value\` DECIMAL(10,2) NOT NULL,
        \`description\` TEXT NOT NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`products\``);
  }
}
