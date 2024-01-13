import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  picture!: string;

  @Column()
  parentId!: number;

  @Column()
  createdAt!: Date;

  @Column()
  updatedAt!: Date;
}
