import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Button = ({ title, onPress, color }) => {
  return (
    <TouchableOpacity
      className={`bg-${color} p-3 rounded-lg`}
      onPress={onPress}>
      <Text className="text-white text-center font-bold">{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
