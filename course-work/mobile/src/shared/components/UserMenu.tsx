import {Box, HamburgerIcon, Menu, Text} from 'native-base';
import React from 'react';
import {Pressable} from 'react-native';
import {ArrowLeftOnRectangleIcon} from 'react-native-heroicons/outline';

import {useLogout} from '../../features';

type MenuIconProps = (
  _props: any,
  state: {
    open: boolean;
  },
) => JSX.Element;

const MenuIcon: MenuIconProps = triggerProps => {
  return (
    <Pressable accessibilityLabel="More options menu" {...triggerProps}>
      <HamburgerIcon />
    </Pressable>
  );
};

export const UserMenu = () => {
  const {logoutHandler} = useLogout();

  return (
    <Menu w="190" trigger={MenuIcon}>
      <Menu.Item onPress={logoutHandler}>
        <Box className="flex-1 flex-row justify-between">
          <Text className="text-rose-500">Log out</Text>
          <ArrowLeftOnRectangleIcon color={'rgba(255,0,0,.7)'} />
        </Box>
      </Menu.Item>
    </Menu>
  );
};
