import React, {FC} from 'react';
import {View} from 'react-native';

import {ForecastDetailContainer} from './ForecastDetailContainer';
import {DropIcon, SunIcon, WindIcon} from '../../../shared';
import {formatHumidity, formatSpeed, getTime} from '../utils';

interface ForecastDetailsProps {
  windSpeedInKmH: number;
  humidityPercent: number;
  sunrise: Date;
}

export const ForecastDetails: FC<ForecastDetailsProps> = ({
  windSpeedInKmH,
  humidityPercent,
  sunrise,
}) => {
  return (
    <View className="flex-row justify-between mx-4">
      <ForecastDetailContainer
        icon={WindIcon}
        text={formatSpeed(windSpeedInKmH)}
      />
      <ForecastDetailContainer
        icon={DropIcon}
        text={formatHumidity(humidityPercent)}
      />
      <ForecastDetailContainer icon={SunIcon} text={getTime(sunrise)} />
    </View>
  );
};
