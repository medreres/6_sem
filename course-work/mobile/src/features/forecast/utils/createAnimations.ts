import {Animated} from 'react-native';

import {CreateAnimations} from '../types';

export const createAnimations: CreateAnimations = cards => {
  const heightAnimation: Record<string, Animated.Value> = {};
  const actionAnimation: Record<string, Animated.Value> = {};

  cards.forEach(card => {
    heightAnimation[card.city.address] = new Animated.Value(100);
    actionAnimation[card.city.address] = new Animated.Value(0);
  });

  return {
    heightAnimation,
    actionAnimation,
  };
};
