import {Button} from 'native-base';
import React, {FC, useMemo} from 'react';
import {Animated, Dimensions, ListRenderItemInfo} from 'react-native';
import {TrashIcon} from 'react-native-heroicons/outline';
import {RowMap, SwipeListView} from 'react-native-swipe-list-view';

import {ForecastCard} from './ForecastCard';
import {ForecastProps} from '../../../shared';
import {ForecastCard as IForecastCard} from '../requests/types';
import {createAnimations} from '../utils';

interface ForecastCardsProps {
  cards: IForecastCard[];
  handleDelete: (
    address: string,
    bypassCheck?: boolean | undefined,
  ) => Promise<void>;
  handleOpen: (params: ForecastProps) => void;
}

export const ForecastCards: FC<ForecastCardsProps> = ({
  cards,
  handleOpen,
  handleDelete,
}) => {
  const {actionAnimation, heightAnimation} = useMemo(
    () => createAnimations(cards),
    [cards],
  );

  const onSwipeValueChange = (swipeData: {
    key: string;
    value: number;
    direction: 'left' | 'right';
    isOpen: boolean;
  }) => {
    const {key, value} = swipeData;

    actionAnimation[key].setValue(Math.abs(value));

    if (
      value < -Dimensions.get('window').width &&
      !(this as any).animationIsRunning // * Didn't find the right interface for context
    ) {
      (this as any).animationIsRunning = true;
      Animated.timing(heightAnimation[key], {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start(async () => {
        await handleDelete(key);
        (this as any).animationIsRunning = false;
      });
    }
  };

  const renderItem = (data: ListRenderItemInfo<IForecastCard>) => (
    <Animated.View
      style={[
        {
          height: heightAnimation[data.item.city.address].interpolate({
            inputRange: [0, 100],
            outputRange: [0, 100],
          }),
        },
      ]}>
      <ForecastCard
        address={data.item.city.address}
        cityName={data.item.city.name}
        onPress={handleOpen.bind(null, data.item.city)}
        temperature={{
          current: data.item.daily[0].temperature.day,
          max: data.item.daily[0].temperature.max,
          min: data.item.daily[0].temperature.min,
        }}
        weatherDescription={data.item.daily[0].weather[0].main}
        weatherId={data.item.daily[0].weather[0].icon}
      />
    </Animated.View>
  );

  const renderHiddenItem: (
    data: ListRenderItemInfo<IForecastCard>,
    row: RowMap<IForecastCard>,
  ) => JSX.Element = data => (
    <Animated.View
      className="flex flex-row justify-end"
      style={[
        {
          opacity: heightAnimation[data.item.city.address].interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
          }),
        },
      ]}>
      <Animated.View
        style={[
          {
            width: actionAnimation[data.item.city.address].interpolate({
              inputRange: [0, 100],
              outputRange: [0, 100],
            }),
          },
        ]}>
        <Button
          onPress={() => handleDelete(data.item.city.address)}
          colorScheme="red"
          className="h-24 items-center rounded-2xl px-5 py-2">
          <Animated.View
            className="flex flex-col justify-center items-center"
            style={[
              {
                transform: [
                  {
                    scale: actionAnimation[data.item.city.address].interpolate({
                      inputRange: [0, 100],
                      outputRange: [0.5, 1],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              },
            ]}>
            <TrashIcon color="white" />
            <Animated.Text
              className="text-white w-full text-center"
              style={[
                {
                  fontSize: actionAnimation[data.item.city.address].interpolate(
                    {
                      inputRange: [0, 20],
                      outputRange: [1, 2],
                    },
                  ),
                },
              ]}>
              Delete
            </Animated.Text>
          </Animated.View>
        </Button>
      </Animated.View>
    </Animated.View>
  );

  return (
    <SwipeListView
      className="my-4 rounded-md"
      disableRightSwipe
      data={cards}
      keyExtractor={data => data.city.address}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      rightOpenValue={-Dimensions.get('window').width}
      previewRowKey={cards[0]?.city.address || '0'} // * '0' for the case when list is empty
      previewOpenValue={-80}
      previewOpenDelay={1000}
      showsVerticalScrollIndicator={false}
      onSwipeValueChange={onSwipeValueChange}
      useNativeDriver={false}
    />
  );
};
