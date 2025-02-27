import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, StyleSheet, Easing } from 'react-native';
import { useRouter } from 'expo-router';

const LoadingScreen = () => {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const textInterpolation = useRef(new Animated.Value(0)).current; // Controls text change
  const [displayText, setDisplayText] = useState('XT'); // Initially "XT"
  const router = useRouter();

  useEffect(() => {
    Animated.sequence([
      // Step 1: Zoom out & fade out "XT"
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 3,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]),
      // Step 2: Switch text to "XpenseTracker"
      Animated.timing(textInterpolation, {
        toValue: 1,
        duration: 0, // Instant change
        useNativeDriver: false,
      }),
      // Step 3: Change the actual text value
      Animated.delay(0), // Slight delay to update state
    ]).start(() => {
      setDisplayText('XpenseTracker'); // Change text to "XpenseTracker"

      // Step 4: Zoom in & fade in "XpenseTracker"
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Step 5: Zoom out & fade out again
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 3,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setTimeout(() => {
            router.push('/onboarding'); // Navigate to next screen
          }, 1000);
        });
      });
    });
  }, [router, scale, opacity]);

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.text,
          {
            transform: [{ scale }],
            opacity,
          },
        ]}
      >
        {displayText} {/* Dynamically switch between "XT" and "XpenseTracker" */}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default LoadingScreen;
