import {Box, Button, Text} from 'native-base';
import React, {FC, ReactNode} from 'react';

interface Action {
  title: ReactNode;
  callback: () => any;
}

interface ToastProps {
  action?: Action;
  title: string;
}

export const Toast: FC<ToastProps> = ({action, title}) => {
  return (
    <Box
      bg="gray.400"
      className="bg-gray-700 px-3 py-1 mb-5 rounded-xl flex-row content-between items-center">
      <Text className="text-white">{title}</Text>
      {action && (
        <Button
          size="xs"
          colorScheme="green"
          variant="ghost"
          onPress={action.callback}>
          {action.title}
        </Button>
      )}
    </Box>
  );
};
