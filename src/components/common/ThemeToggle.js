import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../../contexts/ThemeContext';

const ThemeToggle = ({style}) => {
  const {isDarkMode, toggleTheme, theme} = useTheme();
  return (
    <TouchableOpacity style={style} onPress={toggleTheme}>
      <Icon
        name={isDarkMode ? 'dark-mode' : 'light-mode'}
        size={24}
        color={theme.background}
      />
    </TouchableOpacity>
  );
};

export default ThemeToggle;
