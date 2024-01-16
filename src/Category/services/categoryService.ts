import { AppDataSource } from "../../connectionDB/connection";
import { ICategoryData, IForId } from "../../interfaces";
import { Category } from "../model/categoryModel";
const categoryRepository = AppDataSource.getRepository(Category);

export const getCatService = async () => {
  return await categoryRepository.find();
};

export const addCatService = async (categoryData: ICategoryData) => {
  return await categoryRepository.save(categoryData);
};

export const deleteCatService = async ({ id }: IForId) => {
  return await categoryRepository.delete({ id });
};

export const updateCatService = async (updatedCat: ICategoryData) => {
  return await categoryRepository.save(updatedCat);
};

export const getSpecificCatService = async ({ id }: IForId) => {
  return await categoryRepository.findOneBy({ id });
};
