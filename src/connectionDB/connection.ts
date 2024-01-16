import "dotenv/config";
import { DataSource } from "typeorm";
import { Category } from "../Category/model/categoryModel";
import { Product } from "../Product/model/productModel";
import { InitSchema1705362392683 } from "../migrations/1705362392683-InitSchema";
const dbport = Number(process.env.BATABASE_PORT);
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const dbName = process.env.DATABASE_NAME;

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: dbport,
  username: username,
  password: password,
  database: dbName,
  synchronize: false,
  logging: true,
  entities: [Product, Category],
  subscribers: [],
  migrations: [InitSchema1705362392683],
});
