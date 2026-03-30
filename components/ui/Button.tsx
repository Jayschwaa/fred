import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
}) => {
  const containerStyle = [
    styles.container,
    styles[`variant_${variant}`],
    styles[`size_${size}`],
    disabled && styles.disabled,
    style,
  ];

  const textStyle = [styles.text, styles[`text_size_${size}`]];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={textStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  variant_primary: {
    backgroundColor: '#0A1628',
  },
  variant_secondary: {
    backgroundColor: '#E8E8E8',
  },
  variant_success: {
    backgroundColor: '#10B981',
  },
  variant_danger: {
    backgroundColor: '#EF4444',
  },
  size_small: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  size_medium: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  size_large: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
  },
  text_size_small: {
    fontSize: 12,
  },
  text_size_medium: {
    fontSize: 14,
  },
  text_size_large: {
    fontSize: 16,
  },
  disabled: {
    opacity: 0.5,
  },
});
