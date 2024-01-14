import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fastifyMulter from "fastify-multer";
import fastify from "fastify";
import { addProductControl, deleteProductControl, getProductsControl, updateProductControl } from "../controllers/productController";

const app = fastify({ logger: true });
app.register(fastifyMulter.contentParser)

  const upload = fastifyMulter({ dest: "pictures/" });

export async function productRoutes(fastify: FastifyInstance) {
  fastify.get("/", getProductsControl);
  fastify.route({
   method: "POST",
   url: "/addProduct",
   preHandler: upload.single("picture"),
   handler: addProductControl
  });
  fastify.delete("/:id", deleteProductControl);
  fastify.put("/:id",updateProductControl)
}



