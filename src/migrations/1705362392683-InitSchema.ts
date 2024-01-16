import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1705362392683 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
    
            CREATE TABLE categories (
                id BIGINT NOT NULL AUTO_INCREMENT,
                name varchar(255) UNIQUE NOT NULL,
                picture MEDIUMBLOB NOT NULL,
                parent_id BIGINT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY(id)
            );

        `);
      await queryRunner.query(`
      
            CREATE TABLE products (
                id BIGINT NOT NULL AUTO_INCREMENT,
                name varchar(255) NOT NULL,
                picture MEDIUMBLOB NOT NULL,
                category_id BIGINT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY(id),
                FOREIGN KEY(category_id) REFERENCES categories(id)
            );`);
  }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        
        DROP TABLE products;
        DROP TABLE categories;
      `);
  }
}
