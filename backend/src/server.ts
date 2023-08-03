import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import { graphqlUploadExpress } from 'graphql-upload-ts'
import schema from "./modules/index"
import bodyParser from 'body-parser';
import { resolve } from 'path';


const app = express()
app.use(express.static(resolve("uploads")))
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const httpServer = http.createServer(app);


mongoose
    .connect('mongodb://127.0.0.1/exam_4')
    .then((d) => console.log("db connection"))
    .catch((e) => console.log("db error", e.message));


!async function () {
	const server = new ApolloServer({
    schema,
    csrfPrevention: false,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  
  await server.start();

  app.use(
    '/graphql',
    graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1 }),
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server , {
        context:async ({ req }) => ({ token: req.headers.authorization }) 
    }),
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
  );
  console.log(`🚀 Server ready at http://localhost:4000/`);
}()