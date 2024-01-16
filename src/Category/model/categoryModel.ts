import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Product } from "../../Product/model/productModel";
import { Timestamp } from "../../common/timestamp";

@Entity("categories")
@Unique(["name"])
export class Category extends Timestamp {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id!: string;

  @Column({ name: "name" })
  name!: string;

  @Column("mediumblob")
  picture!: Buffer;

  @Column({ type: "bigint", name: "parent_id" })
  parentId!: string;

  @OneToMany(() => Category, (category) => category.parentCategory)
  subCategories!: Category[];

  @ManyToOne(() => Category, (category) => category.subCategories)
  @JoinColumn({ name: "parent_id", referencedColumnName: "id" })
  parentCategory!: Category;

  @OneToMany(() => Product, (product) => product.category)
  products!: Product[];
}
