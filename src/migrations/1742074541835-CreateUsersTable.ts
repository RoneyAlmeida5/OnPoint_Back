import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1742074541835 implements MigrationInterface {
  name = 'CreateUsersTable1742074541835';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`users\` 
            (\`id\` int NOT NULL AUTO_INCREMENT, 
            \`name\` varchar(255) NOT NULL, 
            \`cpf\` varchar(255) NOT NULL, 
            \`email\` varchar(255) NOT NULL, 
            \`password\` varchar(255) NOT NULL, 
            \`token\` varchar(255) NOT NULL DEFAULT '', 
            \`user_blocked\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY 
            (\`id\`)) ENGINE=InnoDB`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
