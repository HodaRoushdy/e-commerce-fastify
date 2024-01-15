import "dotenv/config";
import fastify, { FastifyReply, FastifyRequest } from "fastify";
import "reflect-metadata";
import { productRoutes } from "./Product/routes/productRoutes";
import { AppDataSource } from "./connectionDB/connection";
import fastifyMulter from "fastify-multer";
import { categoryRoutes } from "./Category/routes/categoryRoutes";
const app = fastify({ logger: true });
const port = Number(process.env.PORT);


app.addContentTypeParser(
  "application/json",
  { parseAs: "string" },
  (request: any, body: string) => {
    var json = JSON.parse(body);
    console.log(json);
  }
);

app.register(fastifyMulter.contentParser)
app.register(productRoutes);
app.register(categoryRoutes);

AppDataSource.initialize()
  .then(() => {
    app.listen({ port }, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
