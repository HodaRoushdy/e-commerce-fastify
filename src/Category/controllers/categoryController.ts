import { FastifyReply, FastifyRequest } from "fastify";
import { AppDataSource } from "../../connectionDB/connection";
import { Category } from "../model/categoryModel";
import {
  addCatService,
  getCatService,
  updateCatService,
} from "../services/categoryService";

const categoryRepository = AppDataSource.getRepository(Category);

export const getCatControl = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const allCategories = await getCatService();
  reply.send({ allCategories });
};

export const addCatControl = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { name, parentId } = request.body as any;
  const file = (request as any).file;
  const pic = file.buffer;
  const category = new Category();
  if (!name) {
    reply.send("please enter category name");
  } else if (!parentId) {
    reply.send("please enter category parent id");
  } else {
    category.name = name;
    category.parentId = parentId;
    category.picture = pic;
    await addCatService(category);
    reply.send({ "new category added successfully ": category });
  }
};

export const deleteCatControl = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as any;
  if (id) {
    await categoryRepository.delete({ id });
    reply.send("category deleted successfully");
  }
};

export const updateCatControl = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as any;
  const { name, parentId } = request.body as any;
  const file = (request as any).file;
  if (!name) {
    reply.send("please enter the category name");
  } else if (!parentId) {
    reply.send("please enter the category parent id");
  }
  const specificCat = await categoryRepository.findOneBy({ id });
  if (!specificCat) {
    reply.send("invalid id ");
  } else {
    specificCat.name = name;
    specificCat.parentId = parentId;
    specificCat.picture = file.buffer;
    await updateCatService(specificCat);
    reply.send({ "category updated successfully": specificCat });
  }
};

export const getSpecificCat = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = (request as any).params;
  const sql1 = await categoryRepository
    .createQueryBuilder("category")
    .where("category.id= :id", { id: id })
    .getMany();
//   const specificCat = await categoryRepository.manager.query(sql1);
  reply.send({ sql1 });
};

//   'SELECT * FROM Ecommerce.categories WHERE id ="7b522ce3-7fb8-4ab2-8e29-076a9a0d237b"'
