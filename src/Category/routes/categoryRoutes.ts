import fastify, { FastifyInstance } from "fastify";
import fastifyMulter from "fastify-multer";
import {
  addCatControl,
  deleteCatControl,
  getCatControl,
  getCatTreeById,
  getCategoriesWithCount,
  getSpecificCat,
  updateCatControl,
} from "../controllers/categoryController";

const app = fastify({ logger: true });
app.register(fastifyMulter.contentParser);

const storage = fastifyMulter.memoryStorage();
const upload = fastifyMulter({
  storage,
});


export const categoryRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/categories", getCatControl);
  fastify.get("/categoriesTree/:id", getCatTreeById);
  fastify.get("/categories/:id", getSpecificCat);
  fastify.get("/categories/categoriesList", getCategoriesWithCount);
  fastify.route({
    method: "PUT",
    url: "/categories/:id",
    preHandler: upload.single("picture"),
    handler: updateCatControl,
  });
    fastify.delete("/categories/:id", deleteCatControl);
  fastify.route({
    method: "POST",
    url: "/categories/addCategory",
    preHandler: upload.single("picture"),
    handler: addCatControl,
  });
};
