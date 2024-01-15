import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fastifyMulter from "fastify-multer";
import fastify from "fastify";
import { addProductControl, deleteProductControl, getProductsControl, updateProductControl } from "../controllers/productController";

const app = fastify({ logger: true });
app.register(fastifyMulter.contentParser)
  const storage = fastifyMulter.memoryStorage()
  const upload = fastifyMulter({ storage });

export const productRoutes= async (fastify: FastifyInstance)=> {
  fastify.get("/products", getProductsControl);
  fastify.route({
    method: "POST",
    url: "/products/addProduct",
    preHandler: upload.single("picture"),
    handler: addProductControl,
  });
  fastify.delete("/products/:id", deleteProductControl);
  fastify.put("/products/:id", updateProductControl);
}



