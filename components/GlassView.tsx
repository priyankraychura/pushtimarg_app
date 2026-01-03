import React from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';

interface GlassViewProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  theme: any; // You can replace 'any' with your specific Theme interface
}

const GlassView = ({ style, children, theme }: GlassViewProps) => {
  return (
    <View style={[
      // Base styles defined by the component
      { 
        backgroundColor: theme.glass,
        borderColor: theme.border,
        borderWidth: 1,
      },
      // Allow custom styles to override base styles if necessary
      style
    ]}>
      {children}
    </View>
  );
};

export default GlassView;