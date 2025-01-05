import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../../contexts/ThemeContext';

const ThemeToggle = ({style}) => {
  const {isDarkMode, toggleTheme, theme} = useTheme();
  return (
    <TouchableOpacity style={style} onPress={toggleTheme}>
      <Icon
        name={isDarkMode ? 'light-mode' : 'dark-mode'}
        size={24}
        color={theme.text}
      />
    </TouchableOpacity>
  );
};

export default ThemeToggle;
