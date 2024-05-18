import {ResizeMode, Video} from 'expo-av';
import React, {FC} from 'react';

interface BackgroundVideoProps {
  source: any; // * Did not found matching interface
}

export const BackgroundVideo: FC<BackgroundVideoProps> = ({source}) => {
  return (
    <Video
      className="absolute top-0 left-0 bottom-0 right-0 h-24 rounded-2xl opacity-85"
      source={source}
      isLooping
      isMuted
      shouldPlay
      resizeMode={ResizeMode.COVER}
    />
  );
};
