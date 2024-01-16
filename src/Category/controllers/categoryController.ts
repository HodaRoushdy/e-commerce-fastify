import { FastifyReply, FastifyRequest } from "fastify";
import sharp from "sharp";
import { Category } from "../model/categoryModel";
import {
  addCatService,
  deleteCatService,
  getCatService,
  getSpecificCatService,
  updateCatService,
} from "../services/categoryService";

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
        reply.send("error removing this category")
    } else {
        const specificCat = await getSpecificCatService({ id });
        if (!specificCat) {
            reply.send("invalid id ");
        } else {
            await deleteCatService({ id });
            reply.send("category deleted successfully");
        }
    }
}  

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
  } else if (!parentId) {
    reply.send("please enter category parent id");
  } else {
    category.name = name;
    category.parentId = parentId;
    // category.picture = pic;
    category.picture = await resized();
    await addCatService(category);
    reply.send({ "new category added successfully ": category });
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
  } else {
    const specificCat = await getSpecificCatService({ id });
    if (!specificCat) {
      reply.send("invalid id ");
    } else {
      specificCat.name = name;
      specificCat.parentId = parentId;
      specificCat.picture = file.buffer;
      await updateCatService(specificCat);
      reply.send({ "category updated successfully": specificCat });
    }
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
