import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FC} from 'react';

import {useAuthContext} from './features';
import {ForecastScreen, HomeScreen, LoadingScreen} from './screens';
import {AuthScreen} from './screens';
import {RootNavigation} from './shared';

const Stack = createNativeStackNavigator<RootNavigation>();

export const RootComponent: FC = () => {
  const {authenticated, loading} = useAuthContext();

  return (
    <Stack.Navigator>
      {loading && (
        <Stack.Screen
          name="Loading"
          options={{headerShown: false}}
          component={LoadingScreen}
        />
      )}
      {!loading && authenticated && (
        <>
          <Stack.Screen
            name="Home"
            options={{headerShown: false}}
            component={HomeScreen}
          />
          <Stack.Screen
            name="Forecast"
            options={{headerShown: false}}
            component={ForecastScreen}
          />
        </>
      )}
      {!authenticated && (
        <>
          <Stack.Screen
            name="Auth"
            options={{headerShown: false}}
            component={AuthScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
