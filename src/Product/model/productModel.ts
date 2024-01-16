import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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

  // @ManyToOne((type) => Category)
  // @JoinColumn([{ name: "categoryId", referencedColumnName: "id" }])
  @Column({ type: "bigint", name: "category_id" })
  categoryId!: string;
}

