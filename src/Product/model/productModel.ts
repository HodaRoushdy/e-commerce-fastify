import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "../../Category/model/categoryModel";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn({type:"bigint"})
  id!: string;

  @Column()
  name!: string;

  @Column("mediumblob")
  picture!: Buffer;

  // @ManyToOne((type) => Category)
  // @JoinColumn([{ name: "categoryId", referencedColumnName: "id" }])
  @Column({type:"bigint"})
  categoryId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

