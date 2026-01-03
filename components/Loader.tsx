import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

interface LoaderProps {
  theme: any;
  size?: 'small' | 'large';
  color?: string;
  style?: any;
}

const Loader = ({ theme, size = 'small', color, style }: LoaderProps) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator 
        size={size} 
        color={color || theme.devotionalPrimary} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

export default Loader;
