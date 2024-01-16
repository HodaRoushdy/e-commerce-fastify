import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity("categories")
@Unique(["name"])
export class Category {
  @PrimaryGeneratedColumn({type:"bigint"})
  id!: string;

  @Column({ name: "name" })
  name!: string;

  @Column("mediumblob")
  picture!: Buffer;

  @Column({type:"bigint"})
  parentId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
