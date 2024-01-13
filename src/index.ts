import "dotenv/config";
import fastify from "fastify";
import "reflect-metadata";
import { productRoutes } from "./Product/routes/productRoutes";
import { AppDataSource } from "./connectionDB/connection";

const app = fastify({ logger: true });
const port = Number(process.env.PORT);

app.register(productRoutes);

AppDataSource.initialize()
  .then(() => {
    app.listen({ port }, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
