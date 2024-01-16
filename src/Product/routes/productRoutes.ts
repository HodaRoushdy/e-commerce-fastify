import fastify, { FastifyInstance } from "fastify";
import fastifyMulter from "fastify-multer";
import {
  getProductsControl,
  deleteProductControl,
  addProductControl,
  updateProductControl,
  getSpecificProduct,
} from "../controllers/productController";

const app = fastify({ logger: true });
app.register(fastifyMulter.contentParser);

const storage = fastifyMulter.memoryStorage();
const upload = fastifyMulter({
  storage,
});

export const productRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/products", getProductsControl);
  fastify.get("/products/:id", getSpecificProduct);
  fastify.put("/products/:id", updateProductControl);
  fastify.delete("/products/:id", deleteProductControl);
  fastify.route({
    method: "POST",
    url: "/products/addProduct",
    preHandler: upload.single("picture"),
    handler: addProductControl,
  });
};


