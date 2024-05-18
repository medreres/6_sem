import {ApolloProvider} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';

import {AuthContextProvider} from './src/features';
import {client} from './src/graphql';
import {RootComponent} from './src/RootComponent';

export default function App() {
  return (
    <NativeBaseProvider>
      <ApolloProvider client={client}>
        <AuthContextProvider>
          <NavigationContainer>
            <RootComponent />
          </NavigationContainer>
        </AuthContextProvider>
      </ApolloProvider>
    </NativeBaseProvider>
  );
}
