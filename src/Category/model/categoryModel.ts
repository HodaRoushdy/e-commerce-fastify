import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity("categories")
@Unique(["name"])
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "name" })
  name!: string;

  @Column("mediumblob")
  picture!: Buffer;

  @Column()
  parentId!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
