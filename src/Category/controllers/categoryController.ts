import { FastifyReply, FastifyRequest } from "fastify";
import sharp from "sharp";
import { AppDataSource } from "../../connectionDB/connection";
import { Category } from "../model/categoryModel";
import {
  addCatService,
  deleteCatService,
  getCatService,
  getSpecificCatService,
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

export const deleteCatControl = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as any;
  if (!id) {
    reply.send("error removing this category");
  } else {
    const specificCat = await getSpecificCatService({ id });
    if (!specificCat) {
      reply.send("invalid id ");
    } else {
      await deleteCatService({ id });
      reply.send("category deleted successfully");
    }
  }
};

export const addCatControl = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { name, parentId } = request.body as any;
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
  const category = new Category();
  if (!name) {
    reply.send("please enter category name");
  } else {
    category.name = name;
    category.parentId = parentId;
    category.picture = await resized();
    const newCat = await addCatService(category);
    reply.send({ "new category added successfully ": newCat });
  }
};

export const updateCatControl = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as any;
  const { name, parentId } = request.body as any;
  const file = (request as any).file;

  const specificCat = await getSpecificCatService({ id });
  if (!specificCat) {
    reply.send("invalid id ");
  } else {
    if (name) specificCat.name = name;
    if (parentId) specificCat.parentId = parentId;
    if (file) specificCat.picture = file.buffer;
    await updateCatService(specificCat);
    reply.send({ "category updated successfully": specificCat });
  }
};

export const getSpecificCat = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = (request as any).params;
  const category = await getSpecificCatService({ id });
  if (!category) {
    reply.send("invalid id ");
  } else {
    reply.send({ category });
  }
};

  export const getCategoriesWithCount = () => {
    const categoryProducts = 0;
  };

export const getCatTreeById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = (request as any).params;
  const category = await categoryRepository.find({
    where: [{ id: id }],
    relations: {
      parentCategory: true,
      products: true,
      subCategories: {
        subCategories: {
          subCategories: {
            subCategories: { subCategories: { subCategories: true } },
          },
        },
      },
    },
  });

  // const catego = await categoryRepository
  //   .createQueryBuilder("category")
  //   // .select("category.id", "id")
  //   // .addSelect("category.name", "name")
  //   .leftJoinAndSelect("category.products", "categoProducts1")
  //   .leftJoinAndSelect("categoProducts1.category", "categoProducts1Catego")
  //   .leftJoinAndSelect("categoProducts1Catego.products", "categoProducts2")
  //   .where("category.id = :id", { id: id })
  //   .orWhere("category.parentId = :id", { id: id })
  //   // .orWhere("category.parentId = :id", { id: id })

  //   .getMany();

//   const catego = await categoryRepository.query(`
// select distinct c.id,c.name,count(p.id) as productCount from categories as c
// left join products as p on p.category_id = c.id
// group by c.id,p.id
//   `);
  //   reply.send({ catego });
  reply.send(category)
};
