import {ApolloClient, HttpLink, InMemoryCache} from '@apollo/client';
import * as SecureStore from 'expo-secure-store';

const SERVER_URL = 'http://localhost:4000';

// *
// * admin@admin.com
// */

export const customFetch: WindowOrWorkerGlobalScope['fetch'] = async (
  uri,
  options,
) => {
  const tokens = (await SecureStore.getItemAsync('cookies')) || '';

  const url = `${SERVER_URL}${uri}`;
  const res = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      ...options?.headers,
      Cookie: tokens,
    },
  });

  const cookies = res.headers.get('set-cookie');

  if (cookies) {
    await SecureStore.setItemAsync('cookies', cookies);
  }

  return res;
};

export const link = new HttpLink({fetch: customFetch});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});
