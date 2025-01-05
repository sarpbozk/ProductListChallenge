import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from './contexts/ThemeContext';
import {FavoritesProvider} from './contexts/FavoritesContext';
import {CartProvider} from './contexts/CartContext';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <FavoritesProvider>
          <CartProvider>
            <AppNavigator />
          </CartProvider>
        </FavoritesProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
