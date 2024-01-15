import { FastifyReply, FastifyRequest } from "fastify";
import { AppDataSource } from "../../connectionDB/connection";
import { IproductData } from "../../interfaces";
import { Product } from "../model/productModel";
import {
  addProductService,
  deleteProductService,
  getProductsService,
} from "../services/productService";

import { IForId } from "./../../interfaces";
const productRepository = AppDataSource.getRepository(Product);

export const getProductsControl = async () => {
  const products = await getProductsService();
  return { products: products };
};

export const addProductControl = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { name, categoryId } = request.body as IproductData;
  const file = (request as any).file;
  console.log(file.buffer);
  if (name && categoryId) {
    const productData = new Product();
    productData.picture = file.buffer;
    productData.name = name;
    productData.categoryId = categoryId;
    await addProductService(productData);

    reply.send({ productData });
  } else if (!name) {
    reply.send("enter the name of product please");
  } else {
    reply.send("enter category id please");
  }
};

export const deleteProductControl = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as IForId;
  if (id) {
    await deleteProductService({ id });
    reply.send("deleted successfully");
  } else {
    reply.send("invalid product");
  }
};

export const updateProductControl = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as IForId;
  const { name, categoryId } = request.body as IproductData;
  if (id && name && categoryId) {
    const product = new Product();
    product.name = name;
    product.categoryId = categoryId;
    await productRepository.save(product);
  }
};
