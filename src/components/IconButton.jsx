import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import * as Lucide from 'lucide-react-native'; // Import all Lucide icons

export default function IconButton({
  icon = 'plus', 
  size = 24, 
  color = '#10B981', 
  onPress,
  disabled = false,
  variant = 'default', 
  style = {},
  ...props
}) {
  const IconComponent = Lucide[icon]; // Dynamically load the icon

  const getButtonStyles = () => {
    switch (variant) {
      case 'outline':
        return {
          borderWidth: 1,
          borderColor: color,
          backgroundColor: 'transparent',
        };
      case 'contained':
        return {
          backgroundColor: color,
        };
      case 'default':
      default:
        return {
          backgroundColor: 'transparent',
        };
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyles(),
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      {...props}
    >
      <IconComponent size={size} color={disabled ? '#D1D5DB' : color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});