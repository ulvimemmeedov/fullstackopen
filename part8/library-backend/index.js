const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const { ApolloServer } = require('apollo-server-express');
const { createServer } = require('http');
const { useServer: useGraphQlWsOnWsServer } = require('graphql-ws/lib/use/ws');
const { WebSocketServer } = require('ws');
const express = require('express');
const mongoose = require('mongoose');
const { context, schema } = require('./graphql');
const { MONGODB_URI, PORT } = require('./utils/config');

mongoose.connect(MONGODB_URI);

const app = express();

const path = '/';

const httpServer = createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path,
});

const { dispose: disposeWsServer } = useGraphQlWsOnWsServer(
  { schema },
  wsServer
);

const apolloServer = new ApolloServer({
  context,
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await disposeWsServer();
          },
        };
      },
    },
  ],
});

(async () => {
  await apolloServer.start();

  app.use(apolloServer.getMiddleware({ path }));

  await httpServer.listen({ port: PORT });

  console.log(
    `Server ready at http://localhost:${PORT + apolloServer.graphqlPath}`
  );
})();
