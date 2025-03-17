import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSalesTable1742233699759 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criar a tabela 'sales'
    await queryRunner.query(`
      CREATE TABLE \`sales\` (
        \`id\` INT NOT NULL AUTO_INCREMENT,
        \`user_id\` INT NULL,
        \`product_id\` INT NULL,
        \`payment_id\` INT NULL,
        \`date_sale\` DATETIME NOT NULL,
        \`quantity\` INT NOT NULL,
        PRIMARY KEY (\`id\`),
        CONSTRAINT \`FK_2f1f9c8a64b8f0e7ac5d70d410d\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE,
        CONSTRAINT \`FK_6ab75f99a5977c45929e5d01fa7\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE,
        CONSTRAINT \`FK_dcd60b29b63c5f5c3129e06b4b7\` FOREIGN KEY (\`payment_id\`) REFERENCES \`payments\`(\`id\`) ON DELETE CASCADE
      ) ENGINE=InnoDB;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover a tabela 'sales'
    await queryRunner.query(`DROP TABLE \`sales\``);
  }
}
