import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAddRoleToUser1743021219399 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE users
      ADD COLUMN role ENUM('admin', 'user') NOT NULL DEFAULT 'user'
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE users
      DROP COLUMN role
    `);
  }
}
