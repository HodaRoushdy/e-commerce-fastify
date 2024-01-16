import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "../../Category/model/categoryModel";
import { Timestamp } from "../../common/timestamp";

@Entity("products")
export class Product extends Timestamp {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id!: string;

  @Column()
  name!: string;

  @Column("mediumblob")
  picture!: Buffer;

  @Column({ type: "bigint", name: "category_id" })
  categoryId!: string;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn([{ name: "category_id", referencedColumnName: "id" }])
  category!: Category;
}
