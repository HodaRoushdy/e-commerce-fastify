import { FastifyInstance } from "fastify";
import { AppDataSource } from "../../connectionDB/connection";
import { Product } from "../model/productModel";

export async function productRoutes(fastify: FastifyInstance) {
  fastify.get("/", async (request, reply) => {
    const products = await AppDataSource.getRepository(Product).find();
    return { products: products };
  });
}
