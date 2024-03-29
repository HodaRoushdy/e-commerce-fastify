import { FastifyReply, FastifyRequest } from "fastify";
import sharp from "sharp";
import { Product } from "./../../Product/model/productModel";

import {
  addProductService,
  deleteProductService,
  getProductService,
  getSpecificProductService,
  updateProductService,
} from "../services/productService";

export const getProductsControl = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const allProducts = await getProductService();
  reply.send({ allProducts });
};

export const deleteProductControl = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as any;
  if (!id) {
    reply.send("error removing this product");
  } else {
    const specificProduct = await getSpecificProductService({ id });
    if (!specificProduct) {
      reply.send("invalid id ");
    } else {
      await deleteProductService({ id });
      reply.send("product deleted successfully");
    }
  }
};

export const addProductControl = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { name, categoryId } = request.body as any;
  const file = (request as any).file;
  const pic = file.buffer;
  const resized = async () => {
    const resizedImg = await sharp(pic)
      .resize({
        width: 3200,
        height: 3200,
      })
      .toBuffer();
    return resizedImg;
  };
  resized();
  const product = new Product();
  if (!name) {
    reply.send("please enter product name");
  } else if (!categoryId) {
    reply.send("please enter product category id");
  } else {
    product.name = name;
    product.categoryId = categoryId;
    product.picture = await resized();
    const newProduct = await addProductService(product);
    reply.send({ "new product added successfully ": newProduct });
  }
};

export const updateProductControl = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as any;
  const { name, categoryId } = request.body as any;
  const file = (request as any).file;
  const specificProduct = await getSpecificProductService({ id });
  if (!specificProduct) {
    reply.send("invalid id");
  } else {
    if (name) specificProduct.name = name;
    if (categoryId) specificProduct.categoryId = categoryId;
    if (file) specificProduct.picture = file.buffer;
    await updateProductService(specificProduct);
    reply.send({ "product updated successfully": specificProduct });
  }
};

export const getSpecificProduct = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = (request as any).params;
  const product = await getSpecificProductService({ id });
  if (!product) {
    reply.send("invalid id ");
  } else {
    reply.send({ product });
  }
};
