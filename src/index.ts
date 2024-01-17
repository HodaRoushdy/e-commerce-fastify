import "dotenv/config";
import fastify from "fastify";
import fastifyMulter from "fastify-multer";
import "reflect-metadata";
import { categoryRoutes } from "./Category/routes/categoryRoutes";
import { productRoutes } from "./Product/routes/productRoutes";
import { AppDataSource } from "./connectionDB/connection";
const app = fastify({ logger: true });
const port = Number(process.env.PORT);

app.addHook("onRequest", async (request, reply) => {
  reply.header("Access-Control-Allow-Origin", "*");
  reply.header("Access-Control-Allow-Credentials", true);
  reply.header(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, X-Requested-With, Content-Type, Accept, X-Slug, X-UID"
  );
  reply.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, POST, PUT, PATCH, GET, DELETE"
  );
  if (request.method === "OPTIONS") {
    reply.send();
  }
});

app.addContentTypeParser(
  "application/json",
  { parseAs: "string" },
  (request: any, body: string) => {
    var json = JSON.parse(body);
    console.log(json);
  }
);

app.register(fastifyMulter.contentParser);
app.register(productRoutes);
app.register(categoryRoutes);

AppDataSource.initialize()
  .then(() => {
    app.listen({ port }, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
