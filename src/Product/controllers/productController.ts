import { IProductId } from './../../interfaces';
import { AppDataSource } from "../../connectionDB/connection";
import { IproductData } from "../../interfaces";
import { Product } from "../model/productModel";
import { addProductService, deleteProductService, getProductsService } from "../services/productService";
import { FastifyRequest, FastifyReply } from "fastify";
const productRepository = AppDataSource.getRepository(Product);

export const getProductsControl = async () => {
    const products = await getProductsService();
    return { products: products };
};

export const addProductControl = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
    const { name, picture, categoryId }= request.body as IproductData;
    if (name && picture && categoryId) {
        const productData = new Product();
        productData.name = name;
        productData.picture = picture;
        productData.categoryId = categoryId;
        await addProductService(productData)
        
      reply.send({ productData });
    } else if (!name) {
      reply.send("enter the name of product please");
    } else if (!picture) {
      reply.send("enter the picture of product please");
    } else {
      reply.send("enter category id please");
    }
};

export const deleteProductControl = async (request:FastifyRequest,reply : FastifyReply) => {
    const { id } = request.params as IProductId;
    if (id) {
        await deleteProductService({id})
        reply.send("deleted successfully")
    }
    else {
        reply.send("invalid product")
    }
}

export const updateProductControl = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as IProductId;
    const { name, picture, categoryId } = request.body as IproductData;
    if (id && name && picture && categoryId) {
        const product = new Product();
        product.name = name;
        product.picture = picture;
        product.categoryId = categoryId;
        await productRepository.save(product)
    }
};