import {Box, Spinner} from 'native-base';
import React from 'react';

export const Loading = () => {
  return (
    <Box className="flex-1 justify-center items-center">
      <Spinner size="lg" />
    </Box>
  );
};
