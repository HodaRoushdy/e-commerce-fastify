import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  picture!: string;

  @Column()
  categoryId!: number;

  @Column()
  createdAt!: Date;

  @Column()
  updatedAt!: Date;
}
