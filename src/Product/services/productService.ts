import { AppDataSource } from "../../connectionDB/connection";
import { IForId, IproductData } from "../../interfaces";
import { Product } from "../model/productModel";
const productRepository = AppDataSource.getRepository(Product);

export const getProductService = async () => {
  return await productRepository.find();
};

export const addProductService = async (productData: IproductData) => {
  return await productRepository.save(productData);
};

export const deleteProductService = async ({ id }: IForId) => {
  return await productRepository.delete({ id });
};

export const updateProductService = async (updatedProduct: IproductData) => {
  return await productRepository.save(updatedProduct);
};

export const getSpecificProductService = async ({ id }: IForId) => {
  return await productRepository.findOneBy({ id });
};
