import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { COLORS, FONTS, SIZES } from '../constants/theme';

const dashboard = require('../assets/images/icons/home.png')
const camera = require('../assets/images/icons/camera.png')
const profile = require('../assets/images/icons/user.png')

type Props = {
    state: any;
    navigation: any;
    descriptors: any;
};

const CustomNavigation = ({ state, navigation, descriptors }: Props) => {
  const { colors } = useTheme();

  const offset = useSharedValue(0);
  const icon1 = useSharedValue(10);
  const icon2 = useSharedValue(0);
  const icon3 = useSharedValue(0);

  const tabShapeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  const tabIcon1Style = useAnimatedStyle(() => ({
    transform: [{ translateY: icon1.value }],
  }));
  const tabIcon2Style = useAnimatedStyle(() => ({
    transform: [{ translateY: icon2.value }],
  }));
  const tabIcon3Style = useAnimatedStyle(() => ({
    transform: [{ translateY: icon3.value }],
  }));

  return (
    <View
      style={{
        height: 60,
        flexDirection: 'row',
        backgroundColor: colors.card,
        shadowColor: 'rgba(0,0,0,.6)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
      }}
    >
      <Animated.View style={[tabShapeStyle]}>
        <View
          style={{
            width: SIZES.width / 3,
            position: 'absolute',
            zIndex: 1,
            top: 7.5,
            left: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              height: 45,
              width: 45,
              borderRadius: 45,
              backgroundColor: COLORS.primary,
            }}
          />
        </View>
      </Animated.View>

      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }

          let targetOffset = 0;
          if (route.name === 'Dashboard') {
            targetOffset = 0;
            icon1.value = withSpring(10);
            icon2.value = withSpring(0);
            icon3.value = withSpring(0);
          } else if (route.name === 'EditProfile') {
            targetOffset = SIZES.width / 3;
            icon1.value = withSpring(0);
            icon2.value = withSpring(10);
            icon3.value = withSpring(0);
          } else if (route.name === 'Profile') {
            targetOffset = (2 * SIZES.width) / 3;
            icon1.value = withSpring(0);
            icon2.value = withSpring(0);
            icon3.value = withSpring(10);
          }
          offset.value = withSpring(targetOffset);
        };

        const iconSource =
          route.name === 'Dashboard'
            ? dashboard
            : route.name === 'Camera'
            ? camera
            : profile;

        const animatedStyle =
          route.name === 'Dashboard'
            ? tabIcon1Style
            : route.name === 'Camera'
            ? tabIcon2Style
            : tabIcon3Style;

        return (
          <View style={styles.tabItem} key={index}>
            <TouchableOpacity style={styles.tabLink} onPress={onPress}>
              <Animated.View style={animatedStyle}>
                <Image
                  style={{
                    height: 20,
                    width: 20,
                    resizeMode: 'contain',
                    marginBottom: 4,
                    opacity: isFocused ? 1 : 0.6,
                    tintColor: isFocused ? COLORS.white : colors.text,
                  }}
                  source={iconSource}
                />
              </Animated.View>
              <Text
                style={{
                  ...FONTS.fontSm,
                  color: colors.text,
                  opacity: isFocused ? 0 : 1,
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabLink: {
    alignItems: 'center',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomNavigation;
