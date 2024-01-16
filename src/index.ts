import "dotenv/config";
import fastify from "fastify";
import fastifyMulter from "fastify-multer";
import "reflect-metadata";
import { categoryRoutes } from "./Category/routes/categoryRoutes";
import { productRoutes } from "./Product/routes/productRoutes";
import { AppDataSource } from "./connectionDB/connection";
import "./declaration";
const app = fastify({ logger: true });
const port = Number(process.env.PORT);
import cors from 'fastify-cors'
app.addContentTypeParser(
  "application/json",
  { parseAs: "string" },
  (request: any, body: string) => {
    var json = JSON.parse(body);
    console.log(json);
  }
);

app.register(fastifyMulter.contentParser);
// app.register(productRoutes);
// app.register(categoryRoutes);
app.register(cors, {
  productRoutes,
  categoryRoutes,
});
AppDataSource.initialize()
  .then(() => {
    app.listen({ port }, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
