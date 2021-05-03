/* eslint-disable no-param-reassign */
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { SharedElement } from 'react-navigation-shared-element';
import { useTheme } from '@react-navigation/native';

import Text from './Text';

// Load a single book
function BookHeader({ scrollY, book }) {
  const {
    width, margin, colors, normalize, navbar, status,
  } = useTheme();
  const BOOKW = normalize(140, 180);
  const BOOKH = BOOKW * 1.5;
  const HEADER = normalize(width + status, 500);

  // Animated styles
  const anims = {
    header: useAnimatedStyle(() => ({
      width,
      zIndex: 10,
      height: HEADER,
      paddingTop: status,
      position: 'absolute',
      justifyContent: 'center',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      shadowOffset: { height: 2 },
      backgroundColor: colors.card,
      shadowOpacity: interpolate(scrollY.value, [HEADER - navbar - 20, HEADER - navbar], [0, 0.25], 'clamp'),
      transform: [
        { translateY: interpolate(scrollY.value, [0, HEADER - navbar], [0, -HEADER + navbar], 'clamp') },
      ],
    })),
    bg: useAnimatedStyle(() => ({
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.5,
      position: 'absolute',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    })),
    cover: useAnimatedStyle(() => ({
      alignItems: 'center',
      opacity: interpolate(scrollY.value, [HEADER - navbar - 20, HEADER - navbar], [1, 0], 'clamp'),
      transform: [
        { translateY: interpolate(scrollY.value, [0, HEADER / 6], [0, HEADER / 6], 'clamp') },
      ],
    })),
    title: useAnimatedStyle(() => ({
      paddingTop: margin,
      alignItems: 'center',
      paddingHorizontal: margin * 3,
      transform: [
        { translateY: interpolate(scrollY.value, [-50, 0], [20, 0], 'clamp') },
      ],
      opacity: interpolate(scrollY.value, [0, 30], [1, 0], 'clamp'),
    })),
    title2: useAnimatedStyle(() => ({
      left: 0,
      right: 0,
      bottom: 0,
      height: 44,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: margin,
      opacity: interpolate(scrollY.value, [HEADER - navbar - 20, HEADER - navbar], [0, 1], 'clamp'),
    })),
  };

  // Styles
  const styles = StyleSheet.create({
    imgBox: {
      borderRadius: 10,
      shadowRadius: 3,
      shadowOpacity: 0.3,
      shadowOffset: { width: 3, height: 3 },
    },
    bookImg: {
      width: BOOKW,
      height: BOOKH,
      borderRadius: 10,
    },
    author: {
      marginTop: margin / 4,
    },
  });

  return (
    <Animated.View style={anims.header}>
      <Animated.Image blurRadius={15} style={anims.bg} source={{ uri: book.imageUrl }} />

      <Animated.View style={anims.cover}>
        <SharedElement id={book.bookId}>
          <View style={styles.imgBox}>
            <Image style={styles.bookImg} source={{ uri: book.imageUrl }} />
          </View>
        </SharedElement>
      </Animated.View>

      <Animated.View style={anims.title}>
        <Text bold center size={21}>{book.bookTitleBare}</Text>
        <Text size={17} style={styles.author}>{`by ${book.author.name}`}</Text>
      </Animated.View>

      <Animated.View style={anims.title2}>
        <Text numberOfLines={1} bold size={17}>
          {book.bookTitleBare}
        </Text>
      </Animated.View>
    </Animated.View>
  );
}

export default (BookHeader);
