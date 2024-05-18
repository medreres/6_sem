import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const link = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/graphql`,
  credentials: "include",
});

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
