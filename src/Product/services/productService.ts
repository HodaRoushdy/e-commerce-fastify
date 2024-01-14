import { IProductId } from './../../interfaces';
import { AppDataSource } from "../../connectionDB/connection"
import { IproductData } from "../../interfaces";
import { Product } from "../model/productModel"
const productRepository = AppDataSource.getRepository(Product)

export const getProductsService = async () => {
    return await productRepository.find();
}

export const addProductService = async (productData:IproductData) => {
    return await productRepository.save(productData);
}
export const deleteProductService = async ({id}:IProductId) => {
        return await productRepository.delete({id})
    
}
// const updateProductService = async (id,productData: IproductData) => {
//     return await AppDataSource
//     .createQueryBuilder()
//     .update(Product)
//     .set(productData)
//     .where("id = :id", { id: 1 })
//     .execute();
// }