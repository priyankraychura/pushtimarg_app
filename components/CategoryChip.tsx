import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles'; // Adjust path based on your folder structure

interface CategoryChipProps {
  title: string;
  active: boolean;
  onPress: () => void;
  theme: any;
}

const CategoryChip = ({ title, active, onPress, theme }: CategoryChipProps) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.chip, 
        { 
          backgroundColor: active ? theme.devotionalPrimary : theme.card,
          shadowColor: theme.shadow,
          shadowOpacity: active ? 0.4 : 0.05,
          borderColor: active ? 'transparent' : theme.border,
          borderWidth: active ? 0 : 1,
        }
      ]}
    >
      <Text style={[
        styles.chipText, 
        { 
          color: active ? '#FFF' : theme.text,
          fontWeight: active ? '600' : '500'
        }
      ]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CategoryChip;