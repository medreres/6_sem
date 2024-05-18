import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Input, Spinner} from 'native-base';
import React, {FC, useCallback, useRef, useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {MagnifyingGlassIcon, XCircleIcon} from 'react-native-heroicons/outline';

import {Options} from './Options';
import {RootNavigation} from '../../../../shared';
import {useCity} from '../../hooks';
import {City} from '../../types';

interface SearchProps {
  navigation: NativeStackNavigationProp<RootNavigation, 'Home', 'Forecast'>;
}

// * Applying NativeWind doesn't work, had to use styles here
const styles = StyleSheet.create({
  searchIcon: {
    marginLeft: 10,
  },
});

export const Search: FC<SearchProps> = ({navigation}) => {
  const {inputValue, setInputValue, options, loading} = useCity();
  const inputRef = useRef<TextInput>(null);

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleLocationClick = useCallback(
    (city: City) => {
      setInputValue('');
      inputRef.current?.blur();
      navigation.navigate('Forecast', city);
    },
    [navigation, setInputValue],
  );

  const handleClear = useCallback(() => {
    setInputValue('');
    inputRef.current?.blur();
  }, [setInputValue]);

  const ClearIcon: JSX.Element | undefined = inputValue ? (
    <TouchableOpacity
      onPress={handleClear}
      className="rounded-full p-1 m-1 bg-slate-200">
      {!loading && <XCircleIcon size="20" color="white" />}
      {loading && <Spinner color="white" size={20} />}
    </TouchableOpacity>
  ) : undefined;

  return (
    <View className="relative z-50">
      <View className="bg-white-200">
        <Input
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={value => setInputValue(value)}
          value={inputValue}
          placeholder="Search for a city..."
          variant="filled"
          ref={inputRef}
          width="100%"
          height="10"
          className="rounded-full focus:text-white"
          size="2xl"
          py="1"
          px="2"
          InputLeftElement={
            <MagnifyingGlassIcon
              size="25"
              color="grey"
              style={styles.searchIcon}
            />
          }
          InputRightElement={ClearIcon}
        />
      </View>
      {isFocused && options.length > 0 && (
        <Options handleClick={handleLocationClick} data={options} />
      )}
    </View>
  );
};
