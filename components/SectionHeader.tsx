import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles'; // Adjust path based on your folder structure

interface SectionHeaderProps {
  title: string;
  action?: string;
  theme: any;
  onActionPress?: () => void;
}

const SectionHeader = ({ title, action, theme, onActionPress }: SectionHeaderProps) => {
  return (
    <View style={styles.sectionHeader}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>{title}</Text>
      {action && (
        <TouchableOpacity activeOpacity={0.7} onPress={onActionPress}>
          <Text style={[styles.sectionAction, { color: theme.devotionalPrimary }]}>
            {action}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SectionHeader;