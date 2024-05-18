import {Animated} from 'react-native';

import {ForecastCard} from '../requests/types';

export type CreateAnimations = (cards: ForecastCard[]) => {
  heightAnimation: Record<string, Animated.Value>;
  actionAnimation: Record<string, Animated.Value>;
};
