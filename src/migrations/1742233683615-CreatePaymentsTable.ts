import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePaymentsTable1742233683615 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`payments\` (
        \`id\` INT NOT NULL AUTO_INCREMENT,
        \`name\` VARCHAR(255) NOT NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`payments\``);
  }
}
