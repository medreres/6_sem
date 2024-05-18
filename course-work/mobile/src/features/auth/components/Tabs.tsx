/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Image,
  Pressable,
  Stack,
  Text,
  useColorModeValue,
} from 'native-base';
import * as React from 'react';
import {Animated} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';

import {AuthForm} from './LoginForm';
import {RegisterForm} from './RegisterForm';
import {CloudSun} from '../../../shared';
import {RenderItem, Route} from '../types';

const renderScene = SceneMap({
  login: AuthForm,
  register: RegisterForm,
});

const routes: Route[] = [
  {
    key: 'login',
    title: 'Log in',
  },
  {
    key: 'register',
    title: 'Register',
  },
];

export function Tabs() {
  const [index, setIndex] = React.useState(0);

  const renderTabBar: RenderItem = props => {
    return (
      <Stack alignItems="center" space={10} className="mx-14 mb-2">
        <Stack alignItems="center">
          <Text className="text-2xl text-white font-semibold">Weather</Text>
          <Image source={CloudSun} size={'lg'} alt="app icon" />
        </Stack>
        <Box flexDirection="row">
          {props.navigationState.routes.map((route, i) => {
            const borderColor =
              index === i
                ? 'blue.500'
                : useColorModeValue('coolGray.200', 'gray.400');
            return (
              <Pressable
                key={i}
                onPress={() => setIndex(i)}
                borderBottomWidth="3"
                borderColor={borderColor}
                flex={1}
                alignItems="center"
                p="3">
                <Animated.Text className="text-white">
                  {route.title}
                </Animated.Text>
              </Pressable>
            );
          })}
        </Box>
      </Stack>
    );
  };

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      className="mt-28"
    />
  );
}
