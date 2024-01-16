import fastify, { FastifyInstance } from "fastify";
import fastifyMulter from "fastify-multer";
import {
  addCatControl,
  deleteCatControl,
  getCatControl,
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
  fastify.get("/categories/:id", getSpecificCat);
  fastify.put("/categories/:id", updateCatControl);
    fastify.delete("/categories/:id", deleteCatControl);
  fastify.route({
    method: "POST",
    url: "/categories/addCategory",
    preHandler: upload.single("picture"),
    handler: addCatControl,
  });
};
