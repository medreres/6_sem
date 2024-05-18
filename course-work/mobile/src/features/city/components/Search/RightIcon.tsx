import {Spinner} from 'native-base';
import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {XCircleIcon} from 'react-native-heroicons/outline';

interface RightIconProps {
  handleClick: () => void;
  loading: boolean;
}

export const RightIcon: FC<RightIconProps> = ({handleClick, loading}) => {
  return (
    <TouchableOpacity
      onPress={handleClick}
      className="rounded-full p-1 m-1 bg-white-300">
      {!loading && <XCircleIcon size="20" color="white" />}
      {loading && <Spinner color="white" size={20} />}
    </TouchableOpacity>
  );
};
