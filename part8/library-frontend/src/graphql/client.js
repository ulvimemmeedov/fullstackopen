import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { Kind, OperationTypeNode } from 'graphql';
import { createClient } from 'graphql-ws';

const AUTH_TOKEN_LOCAL_STORAGE_KEY = 'library-auth-token';
const PRURL = '//localhost:4000/';

const authLink = setContext((_operation, { headers }) => {
  const authToken = localStorage.getItem(AUTH_TOKEN_LOCAL_STORAGE_KEY);

  return {
    headers: {
      ...headers,
      ...(authToken ? { authorization: `bearer ${authToken}` } : {}),
    },
  };
});

const httpLink = new HttpLink({
  uri: `http:${PRURL}`,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws:${PRURL}`,
  })
);

const splitLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return (
      kind === Kind.OPERATION_DEFINITION &&
      operation === OperationTypeNode.SUBSCRIPTION
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

export default client;
